import { lazy, Suspense } from 'react'
import type { ReactNode } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'

// Heavier pages (markdown, syntax highlighter, search) are split into their
// own chunks and loaded on demand to keep the initial bundle small.
const SubjectsPage = lazy(() =>
  import('./pages/SubjectsPage').then((m) => ({ default: m.SubjectsPage })),
)
const SubjectPage = lazy(() =>
  import('./pages/SubjectPage').then((m) => ({ default: m.SubjectPage })),
)
const TopicPage = lazy(() =>
  import('./pages/TopicPage').then((m) => ({ default: m.TopicPage })),
)
const SearchPage = lazy(() =>
  import('./pages/SearchPage').then((m) => ({ default: m.SearchPage })),
)
const CalendarPage = lazy(() =>
  import('./pages/CalendarPage').then((m) => ({ default: m.CalendarPage })),
)
const AccountPage = lazy(() =>
  import('./pages/AccountPage').then((m) => ({ default: m.AccountPage })),
)
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)

function PageFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-brand-500" />
    </div>
  )
}

function lazyRoute(element: ReactNode) {
  return <Suspense fallback={<PageFallback />}>{element}</Suspense>
}

const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/subjects', element: lazyRoute(<SubjectsPage />) },
      { path: '/subjects/:subjectId', element: lazyRoute(<SubjectPage />) },
      {
        path: '/subjects/:subjectId/topics/:topicId',
        element: lazyRoute(<TopicPage />),
      },
      { path: '/search', element: lazyRoute(<SearchPage />) },
      { path: '/calendar', element: lazyRoute(<CalendarPage />) },
      { path: '/account', element: lazyRoute(<AccountPage />) },
      { path: '*', element: lazyRoute(<NotFoundPage />) },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
