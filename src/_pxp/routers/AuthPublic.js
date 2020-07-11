/**
 * Public Route if user is authenticated redirect to private init route
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Pxp from '../../Pxp';

const AuthPublic = ({ children }) => {
  const authenticated = useSelector((state) => state.auth.uid);
  if (authenticated) {
    console.log(Pxp.config.privateInitRoute);
    return <Redirect to={Pxp.config.privateInitRoute.replace('##first', '')} />;
  }
  return children;
};

export default AuthPublic;
