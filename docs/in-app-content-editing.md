# In-App Content Editing

Design and phased implementation plan for editing topics, subtopics, sub-subtopics, roadmap stages, and TipTap document bodies from the browser.

## Current baseline

| What exists | Gap |
|---|---|
| `TopicDocumentEditor` saves `document.json` via `POST /api/content/document` (dev only) | Metadata (`topic.json`, `roadmap.json`) has no in-app editor |
| `canEdit = import.meta.env.DEV` inside the editor | No global edit/view mode |
| `order` + `parentId` drive tree ordering at build time | No reorder UI |
| `level`: `'beginner' \| 'intermediate' \| 'advanced'` | No strict UI control |
| `hours?: number` or level-based fallback | No strict duration input |
| `Roadmap` is read-only | Stages/nodes cannot be edited in-app |

### Data layout

```
src/content/subjects/<subject-id>/
  subject.json
  roadmap.json              # optional staged learning path
  topics/
    <topic-id>/
      topic.json            # metadata (title, summary, level, order, parentId, hours)
      document.json         # TipTap body (sub-subtopic content)
```

Build output is served from `public/data/` via `scripts/gen-content.mjs`.

### Hierarchy (3 levels)

Depth is implied by `parentId`, not an explicit field:

| Level | Convention |
|---|---|
| Topic (root) | No `parentId` |
| Subtopic | `parentId` = root topic id |
| Sub-subtopic | `parentId` = subtopic id; id often `${parentId}--${slug}` |

---

## Architecture

### 1. Global Edit Mode (single gate)

`EditModeProvider` wraps the app (alongside `AuthProvider` and `ProgressProvider`).

```tsx
type EditModeContext = {
  editMode: boolean
  toggleEditMode: () => void
  setEditMode: (next: boolean) => void
  canUseEditMode: boolean   // import.meta.env.DEV (extend later with auth)
  registerDirty: (id: string) => () => void
}
```

**Header:** `EditModeToggle` sits immediately before `ThemeToggle`, matching button size and style.

**Persistence:** `localStorage` key `lwd-edit-mode`.

**Behavior:**

| Edit mode OFF | Edit mode ON |
|---|---|
| Pure read-only UI | Inline edit affordances visible |
| TipTap in view mode only | TipTap edit toolbar available |
| No drag handles, no add/delete | Drag, add, delete enabled (later phases) |
| Normal navigation | Navigation works; unsaved changes prompt on leave |

All editing is gated with `useEditMode()`. Replace scattered `import.meta.env.DEV` checks.

**Visual cue:** subtle header accent when edit mode is active so the mode is obvious.

### 2. Unified content save layer (extend dev API)

Mirror the existing `contentSaveApi` pattern in `vite.config.ts`:

| Endpoint | Writes | Triggers |
|---|---|---|
| `POST /api/content/topic` | `topics/<id>/topic.json` | `gen-content` → full reload |
| `POST /api/content/topic/create` | new folder + `topic.json` (+ optional empty `document.json`) | full reload |
| `POST /api/content/topic/delete` | removes topic folder | full reload |
| `POST /api/content/reorder` | batch-updates `order` on sibling `topic.json` files | full reload |
| `POST /api/content/roadmap` | `roadmap.json` | full reload |
| `POST /api/content/document` | *(existing)* `document.json` | no full reload |

Shared server utilities:

- Reuse `SAFE_ID` validation from `vite.config.ts`
- Validate payloads with the same allowed fields as `scripts/lib/section-validators.mjs`
- After write, call `generateContent({ force: true })` (already wired via file watcher)

Client module: `src/lib/content-api.ts` — typed wrappers, shared `SaveStatus`, cache invalidation via `src/content/data.ts`.

### 3. Validation rules (strict, shared client + server)

Define once in `src/lib/content-validation.ts` and duplicate minimal checks in Vite middleware.

**Level (strict selection)**

```ts
const DIFFICULTY = ['beginner', 'intermediate', 'advanced'] as const
// UI: <select> or segmented control — no free text
```

**Duration (strict format)**

Model stores `hours?: number` on `topic.json`.

| Node type | Duration UI |
|---|---|
| **Leaf** (no subtopics) | Structured input: hours (0–99) + minutes (0–59), stored as decimal hours (`1h 30m` → `hours: 1.5`) |
| **Parent** (has subtopics) | Read-only computed badge from `subtreeMinutes()` |
| **Clear override** | “Use level default” checkbox clears `hours` → falls back to `MINUTES_BY_LEVEL` |

Display continues using `formatDuration(subtreeMinutes(topic))`.

**Title / summary**

- Title: required, 1–200 chars, trimmed
- Summary: optional on sub-subtopics (hidden on sub-subtopic pages per current convention)
- Inline validation errors before save

**IDs (on create only)**

- Slug from title with manual override
- Enforce `SAFE_ID` regex
- Sub-subtopic convention: `${parentId}--${slug}`
- Max depth 3: reject create if parent already has `getAncestors().length >= 2`

### 4. UI design: edit in place, save per entity

Follow the `TopicDocumentEditor` pattern (view ↔ edit, dirty tracking, Save/Cancel) adapted by surface.

#### A. Topic header (`TopicPage`)

When edit mode is on, replace static header with `EditableTopicHeader`:

- Title input
- Summary textarea (hidden if sub-subtopic)
- Level select, duration input (computed if parent)
- Save/Cancel per topic

#### B. Topic tree (`TopicTree` + `SubjectPage` topics tab)

When edit mode is on, swap rows for `EditableTopicNode`:

- Drag handle for reorder (`@dnd-kit/core` + `@dnd-kit/sortable`)
- Inline edit, add subtopic/topic buttons, delete with confirm

#### C. TipTap body (`TopicDocumentEditor`)

- Gate on global `editMode` (Phase 1)
- Keep view/edit split inside the component
- When global edit mode turns off while dirty → confirm dialog

#### D. Roadmap (`Roadmap` on `SubjectPage`)

When edit mode is on, render `EditableRoadmap`:

- Edit stage title/summary
- Add/reorder/delete stages and nodes
- Node fields: title, description, status (core | optional), topicId (searchable select)
- Save writes entire `roadmap.json`

### 5. Reordering model

Persist `order: number` on sibling `topic.json` files (already used by `gen-content.mjs`).

**Reorder API payload:**

```json
{
  "subjectId": "gen-ai",
  "parentId": "programming-fundamentals",
  "orderedIds": ["programming-basics", "control-flow"]
}
```

Server rewrites `order: 0, 1, 2, …` for each sibling.

For roadmap: reorder arrays directly in `roadmap.json` (order is array index).

### 6. Create / delete flows

**Create topic modal:**

| Field | Default |
|---|---|
| Title | — |
| ID | auto-slug from title, editable |
| Level | `beginner` |
| Summary | empty (root/subtopic only) |
| Parent | inferred from context |
| Create empty content | checkbox for sub-subtopic |

**Delete:** confirm with subtree count; unlink roadmap nodes referencing deleted `topicId`.

### 7. Unsaved changes & navigation

```
EditModeProvider
  └── dirty registry (registerDirty / unregister)
  └── leave callbacks (registerOnLeaveEditMode) reset open editors
        └── blocks edit-mode toggle-off when dirty (confirm first)
```

- Per-entity Save/Cancel (matches current TipTap UX)
- Floating banner when anything is dirty (Phase 5)
- `beforeunload` handler in dev when dirty (Phase 5)

### 8. Component map

| New | Role |
|---|---|
| `EditModeToggle.tsx` | Header toggle |
| `editModeContext.ts` + `EditModeProvider.tsx` | Global gate |
| `content-api.ts` | Save/create/reorder/delete clients (Phase 2+) |
| `content-validation.ts` | Shared validators (Phase 2+) |
| `EditableField.tsx` | Reusable inline input/select (Phase 2+) |
| `DurationInput.tsx` | Hours + minutes → `hours` (Phase 2+) |
| `LevelSelect.tsx` | Strict difficulty picker (Phase 2+) |
| `EditableTopicHeader.tsx` | TopicPage metadata (Phase 2) |
| `EditableTopicTree.tsx` | DnD + CRUD (Phase 3) |
| `EditableRoadmap.tsx` | Stage/node CRUD + reorder (Phase 4) |
| `CreateTopicDialog.tsx` | Add topic/subtopic/sub-subtopic (Phase 3) |

| Modified | Change |
|---|---|
| `Header.tsx` | Add `EditModeToggle`, edit-mode visual cue |
| `main.tsx` | Wrap with `EditModeProvider` |
| `TopicPage.tsx` | Gate dev create + metadata editing |
| `TopicDocumentEditor.tsx` | Use `useEditMode()` |
| `TopicTree.tsx` | Editable variant (Phase 3) |
| `SubjectPage.tsx` | Pass edit mode to topics tab + roadmap (Phase 3–4) |
| `vite.config.ts` | New API routes (Phase 2+) |

---

## Phased implementation

### Phase 1 — Foundation ✅

- `EditModeProvider` + toggle in header
- Gate existing `TopicDocumentEditor` on global edit mode
- Dirty registry blocks turning edit mode off with unsaved TipTap changes
- **Deliverable:** toggle works; TipTap editable only when edit mode is on

### Phase 2 — Topic metadata editing ✅

- `POST /api/content/topic`
- `EditableTopicHeader` on `TopicPage` (title, summary, level, duration)
- **Deliverable:** edit and save any topic’s metadata

### Phase 3 — Tree CRUD + reorder ✅

- Create/delete/reorder endpoints + dialogs
- DnD reorder for topics/subtopics/sub-subtopics
- **Deliverable:** full tree management on SubjectPage and TopicPage subtopic lists

### Phase 4 — Roadmap editing

- `POST /api/content/roadmap`
- `EditableRoadmap` (stages + nodes, reorder, link to topics)
- **Deliverable:** full roadmap authoring in-app

### Phase 5 — Polish

- Unsaved-changes banner, toasts, keyboard shortcuts (⌘S save)
- Subject-level metadata (`subject.json`) if desired
- Tag editing

---

## Open decisions

1. **Dev-only vs production editing** — Current save API is dev-only (GitHub Pages is static). Default: keep dev-only; extend with auth + backend later if needed.
2. **Duration on parent topics** — Read-only computed duration when a topic has children (matches `subtreeMinutes` in `src/lib/duration.ts`).
3. **Sub-subtopic summary** — Allow editing summary in the tree but keep it hidden on the sub-subtopic page, unless UX changes later.

---

## Key files (reference)

| Area | Path |
|---|---|
| Types | `src/types/content.ts`, `src/types/tiptap-document.ts` |
| Data loading | `src/content/data.ts` |
| Build | `scripts/gen-content.mjs`, `vite.config.ts` |
| Topic page | `src/pages/TopicPage.tsx` |
| Editor | `src/components/editor/TopicDocumentEditor.tsx` |
| Save API | `src/lib/save-topic-document.ts` |
| Duration | `src/lib/duration.ts` |
| Header | `src/components/layout/Header.tsx` |
