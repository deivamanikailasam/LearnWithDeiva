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

## Deployment (GitHub Pages)

1. Push the project to a GitHub repo named `LearnWithDeiva` (or update the
   `VITE_BASE` value in `.github/workflows/deploy.yml` and the `base` in
   `vite.config.ts` to match your repo name).
2. In the repo settings, set **Pages → Build and deployment → Source** to
   **GitHub Actions**.
3. Push to `main`. The included workflow builds and deploys automatically.

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
