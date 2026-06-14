# LearnWithDeiva

A modern, open, **data-driven** platform for learning any tech subject — built with React, Vite, TypeScript and Tailwind CSS, and deployable to **GitHub Pages**.

Each subject is organised into topics and subtopics, and every topic is split
into rich sections: explanation, code, synonyms/glossary, applications,
learning materials, references, projects, interview questions, scenario
questions, case studies, exam prep and course prep. A roadmap chart guides the
learning path for each subject, and powerful search spans everything.

## Tech stack

- **React + Vite + TypeScript**
- **Tailwind CSS** (dark/light theme)
- **React Router** (HashRouter — no server config needed on GitHub Pages)
- **Fuse.js** for fuzzy search
- **react-markdown** + syntax highlighting for content

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build into dist/
npm run preview  # preview the production build
```

## Content architecture

All learning content is plain data — **no code changes are needed to add a
subject, topic or section**. Files are discovered automatically at build time
via Vite's `import.meta.glob`.

```
src/content/subjects/
  <subject-id>/
    subject.json              # subject metadata (title, icon, gradient, tags…)
    roadmap.json              # staged roadmap with nodes linking to topics
    topics/
      <topic-id>/
        topic.json            # topic metadata; optional parentId for subtopics
        sections/
          explanation.json
          code.json
          synonyms.json
          applications.json
          materials.json
          references.json
          projects.json
          interview-questions.json
          scenario-questions.json
          case-studies.json
          exam-prep.json
          course-prep.json
```

- A **subtopic** is just a topic whose `topic.json` sets `parentId` to another
  topic's `id` in the same subject.
- A topic only needs the section files it actually has — missing sections are
  skipped in the UI.
- Section file shapes are defined in `src/types/content.ts`.

## Optional: login & cloud sync (Supabase)

By default the app stores completed topics and bookmarks in the browser
(`localStorage`). To let users **log in and sync that data across devices**,
connect a free [Supabase](https://supabase.com) project. Without it, the login
UI is hidden and everything still works locally.

Supabase auth runs entirely in the browser, so this works the same on a local
dev server and on GitHub Pages — no backend to host.

### Step 1 — Create the Supabase project

1. Go to <https://supabase.com> → sign in (free, no credit card).
2. **New project** → choose an org, set a **Name** (e.g. `learnwithdeiva`), a
   **database password** (save it), and a **region** → **Create new project**.
   Wait ~1–2 minutes for it to provision.

### Step 2 — Create the data table + security policies

In the dashboard → **SQL Editor** → **New query** → paste and **Run**:

```sql
create table public.user_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  completed text[] not null default '{}',
  bookmarks text[] not null default '{}',
  updated_at timestamptz not null default now()
);

-- Each user may only read and write their OWN row.
alter table public.user_progress enable row level security;

create policy "read own progress"  on public.user_progress
  for select using (auth.uid() = user_id);
create policy "insert own progress" on public.user_progress
  for insert with check (auth.uid() = user_id);
create policy "update own progress" on public.user_progress
  for update using (auth.uid() = user_id);
```

#### (Optional) Enable account self-deletion

The "Delete account" button calls a database function, because a static site
can't safely use Supabase's admin API. Run this once to allow logged-in users
to delete **their own** account (cascades to their progress row):

```sql
create or replace function public.delete_user()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  delete from auth.users where id = auth.uid();
end;
$$;

revoke all on function public.delete_user() from public, anon;
grant execute on function public.delete_user() to authenticated;
```

> If you skip this, every other feature still works — only the Delete-account
> button will return an error.

> **Changing email:** Supabase's default "Secure email change" sends a
> confirmation link to **both** the old and new addresses — the change only
> completes once the link(s) are clicked. You can relax this to a single
> confirmation under **Authentication → Providers → Email**.

### Step 3 — Find your keys

Dashboard → **Project Settings** (gear icon) → **API**:

- **Project URL** — e.g. `https://your-ref.supabase.co`
- **API key** — the **`anon` / `public`** key (newer projects call this the
  **publishable** key, formatted `sb_publishable_…`). Either works.

> ⚠️ Use the **anon / publishable (public)** key only. **Never** put the
> `service_role` (secret) key in the frontend.

### Step 4 — Configure auth redirect URLs

Dashboard → **Authentication** → **URL Configuration**:

- **Site URL:**
  ```
  https://<your-github-username>.github.io/LearnWithDeiva/
  ```
- **Redirect URLs** — add each of these (the allow-list can hold many):
  ```
  http://localhost:5173/
  http://localhost:4173/
  https://<your-github-username>.github.io/LearnWithDeiva/
  ```
  (Or use wildcards: `http://localhost:**` and
  `https://<your-github-username>.github.io/**`.)

Click **Save**. The **Site URL** is just the default fallback; localhost keeps
working as long as it stays in the Redirect URLs list.

### Step 5 — Add the keys for local dev

Copy `.env.example` to `.env` (the `.env` file is gitignored — never commit it)
and fill in:

```bash
VITE_SUPABASE_URL=https://your-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-or-publishable-key
```

Then **restart** `npm run dev` (Vite reads env vars only at startup). A
**Sign in** button now appears in the header.

### Step 6 — Add the keys for GitHub Pages

The cloud build doesn't see your local `.env`, so add the keys as repo secrets:

Repo → **Settings** → **Secrets and variables** → **Actions** →
**New repository secret** (create both):

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | your Project URL |
| `VITE_SUPABASE_ANON_KEY` | your anon / publishable key |

The deploy workflow (`.github/workflows/deploy.yml`) already forwards them to
the build. Push to `main` (or re-run the latest **Actions** workflow) to deploy
with login enabled.

> The publishable key **will be visible** in the deployed JS — that's by
> design and safe, because Row Level Security ensures each user can only
> read/write their own row.

### How sync behaves

- On first sign-in on a device, local (guest) data is **merged** into the
  account, so nothing already saved is lost.
- Changes are pushed to Supabase (debounced) while logged in.
- Signing out **clears the local copy**, so a different account on the same
  browser can't inherit it.

### Troubleshooting

- **No "Sign in" button** → `.env` keys missing/typo'd, or dev server not
  restarted after editing `.env`. Check for stray quotes/spaces around values.
- **"redirect ... not allowed"** on login → the exact URL isn't in
  **Redirect URLs** (mind the trailing slash and the `/LearnWithDeiva/` path).
- **Sign-up seems stuck** → Supabase emails a confirmation link by default. For
  quick testing use **"Email me a magic link"**, or toggle off
  **Authentication → Providers → Email → "Confirm email"**.
- **Login works locally but not live** → repo secrets not set, or you need to
  re-run the deploy after adding them.
- **Google/GitHub buttons error** → those providers must be enabled and
  configured under **Authentication → Providers** (each needs its own OAuth
  client). Email/password and magic links need no extra setup.

## Deployment (GitHub Pages)

1. Push the project to a GitHub repo named `LearnWithDeiva` (or update the
   `VITE_BASE` value in `.github/workflows/deploy.yml` and the `base` in
   `vite.config.ts` to match your repo name).
2. In the repo settings, set **Pages → Build and deployment → Source** to
   **GitHub Actions** (this is a one-time step; without it the deploy fails
   with a `404 — Ensure GitHub Pages has been enabled` error).
3. (Optional) Add the Supabase repo secrets from Step 6 above to enable login.
4. Push to `main`. The included workflow builds and deploys automatically to
   `https://<your-github-username>.github.io/LearnWithDeiva/`.

> Free GitHub accounts can only serve Pages from **public** repos. To keep the
> repo private you need a paid plan, or host the same build on Netlify / Vercel
> / Cloudflare Pages instead.

## Project status

Built in steps:

- [x] **Part 1** — Foundation: scaffold, theming, data architecture, sample
      subject, app shell, GitHub Pages deploy.
- [x] **Part 2** — Subject browsing & roadmap visualisation.
- [x] **Part 3** — Full topic section rendering (markdown, syntax-highlighted
      code, interactive quizzes & Q&A, sticky section navigator).
- [x] **Part 4** — Global & scoped fuzzy search (Ctrl/⌘+K command palette,
      search page with type & subject filters).
- [x] **Part 5** — Progress tracking & bookmarks (localStorage), route-level
      code-splitting, and more subjects (Python, React).
- [x] **Auth** — optional Supabase login (email/password, magic link, OAuth)
      with cloud-synced progress & bookmarks; degrades gracefully when not
      configured.
- [x] **Account** — `/account` page (stats, per-subject progress, completed &
      bookmark lists, clear-completed / clear-bookmarks), change email, change
      password, password reset / set-new-password flow, account self-deletion,
      and per-device sync-status indicators.
