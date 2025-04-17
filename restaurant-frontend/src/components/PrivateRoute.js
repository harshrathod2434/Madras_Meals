import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, user, adminOnly = false }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
