import { Outlet, ScrollRestoration } from 'react-router-dom'
import type { Location } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { SearchProvider } from '../search/SearchProvider'
import { SetPasswordModal } from '../auth/SetPasswordModal'
import { ScrollToTopButton } from '../ScrollToTopButton'
import { useAuth } from '../../lib/authContext'

/**
 * Group all of a subject's tab views under one scroll-restoration key so that
 * switching tabs preserves the scroll position (kept at the tab bar) instead of
 * snapping back up to the hero on every navigation. Topic detail pages and all
 * other routes keep their own per-entry key (default behaviour).
 */
function scrollKey(location: Location): string {
  const match = location.pathname.match(/^\/subjects\/([^/]+)/)
  if (match && !location.pathname.includes('/topics/')) {
    return `subject:${match[1]}`
  }
  return location.key
}

export function Layout() {
  const { passwordRecovery } = useAuth()
  return (
    <SearchProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration getKey={scrollKey} />
        <ScrollToTopButton />
      </div>
      {passwordRecovery && <SetPasswordModal />}
    </SearchProvider>
  )
}
