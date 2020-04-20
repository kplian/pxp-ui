import React from 'react';
import {  Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import config from '../../config';

const AuthPublic = ({ children }) => {
    const authenticated = useSelector(state => state.auth.uid);
    console.log('public',authenticated);
    if ( authenticated ) {  
        return (<Redirect to={config.privateInitRoute} />); 
    }
    return children;       
};

export default AuthPublic;