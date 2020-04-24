import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthPrivate = ({ children }) => {
  const authenticated = useSelector((state) => state.auth.uid || undefined);
  if (authenticated) {
    return children;
  }
  return <Redirect to="/login" />;
};

export default AuthPrivate;
