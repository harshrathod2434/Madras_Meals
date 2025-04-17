import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, children, adminOnly }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
