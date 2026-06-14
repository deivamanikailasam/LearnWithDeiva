import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import { paths } from '../lib/paths'

export function NotFoundPage() {
  return (
    <Container className="py-24 text-center">
      <p className="text-7xl font-extrabold text-brand-500">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-slate-500">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <Link to={paths.home()} className="btn-primary mt-6">
        Back home
      </Link>
    </Container>
  )
}
