import { Route, Navigate } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated, ...props }) {
  if (isAuthenticated) {
    return <Route {...props} />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;