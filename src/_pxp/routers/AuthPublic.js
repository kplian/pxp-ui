/**
 * Public Route if user is authenticated redirect to private init route
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import config from '../../config';

const AuthPublic = ({ children }) => {
  const authenticated = useSelector((state) => state.auth.uid);
  if (authenticated) {
    return <Redirect to={config.privateInitRoute} />;
  }
  return children;
};

export default AuthPublic;
