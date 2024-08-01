import { Route, Navigate } from 'react-router-dom';

function ProtectedRoute({ element, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      element={isAuthenticated ? (
        element
      ) : (
        <Navigate to="/login" replace />
      )}
    />
  );
}

export default ProtectedRoute;