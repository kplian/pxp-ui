import React from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import config from '../../../config';

const useStyles = makeStyles(theme => ({
    root: {
      width: 'auto',
      height: '40px',
    },
}));

const Logo = (props) => {
    console.log('process', JSON.parse(process.env.REACT_APP_JSON));
    
    const url = process.env.REACT_APP_URL_LOGO || null;
    const src = url ? url: props.src || '/images/logo.jpg';
    const classes = useStyles();
    return (
        <img
            alt="Logo"
            src={ src }
            className={ clsx( classes.root, props.className ) }
            {...props}
        />
    );
}

export default Logo;
