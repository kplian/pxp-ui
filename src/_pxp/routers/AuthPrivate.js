import React from 'react';
import {  Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthPrivate = ({ children }) => {
    const authenticated = useSelector(state => state.auth.uid || undefined);        
    console.log('private',authenticated);
    if ( authenticated ) {    
        return children; 
    }
    console.log('redirect');
    return (<Redirect to="/login" />);          
};

export default AuthPrivate;
