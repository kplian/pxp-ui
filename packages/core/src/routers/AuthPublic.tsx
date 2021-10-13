/**
 * Public Route if user is authenticated redirect to private init route
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Pxp from '../Pxp';

const AuthPublic = ({ children }) => {
  const authenticated = useSelector((state: any) => state.auth.uid);
  if (authenticated) {
    return <Redirect to={Pxp.config.privateInitRoute.replace('##first', '')} />;
  }
  return children;
};

export default AuthPublic;
