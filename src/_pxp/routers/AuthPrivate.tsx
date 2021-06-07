/**
 * Private Route if not logged in redirect to login
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */

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
