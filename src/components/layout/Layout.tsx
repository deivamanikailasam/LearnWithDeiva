import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { SearchProvider } from '../search/SearchProvider'
import { SetPasswordModal } from '../auth/SetPasswordModal'
import { useAuth } from '../../lib/authContext'

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
        <ScrollRestoration />
      </div>
      {passwordRecovery && <SetPasswordModal />}
    </SearchProvider>
  )
}
