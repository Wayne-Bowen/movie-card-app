import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute({ children }) {
  const { user, authLoading } = useAuth()

  if (authLoading) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</p>
  }

  if (!user) {
    return <Navigate to="/auth" replace />
  }

  return children
}
