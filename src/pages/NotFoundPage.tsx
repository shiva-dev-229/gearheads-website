import { Link } from 'react-router-dom'
import { FaCircleExclamation } from 'react-icons/fa6'

export default function NotFoundPage() {
  return (
    <div>
      <div>404</div>
      <div><FaCircleExclamation /></div>
      <h1>Page Not Found</h1>
      <p>The page you're looking for doesn't exist or may have moved.</p>
      <Link to="/">← Back to Home</Link>
    </div>
  )
}
