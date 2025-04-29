import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Ici on va vérifier si l'utilisateur est connecté
  const isAuthenticated = true; // Pour l'instant on force à "true" pour avancer

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
