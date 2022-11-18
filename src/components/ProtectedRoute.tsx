import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{
  children: React.ReactElement;
  redirectRoute?: string;
  forwardingRoute?: string;
}> = ({ children, redirectRoute, forwardingRoute }) => {
  const navigate = useNavigate();
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => {
        if (forwardingRoute) navigate(forwardingRoute);
      })
      .catch(() => {
        if (redirectRoute) navigate(redirectRoute);
      });
  }, []);
  return children;
};

export default ProtectedRoute;
