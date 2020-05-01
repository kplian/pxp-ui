/**
 * Collapse with horizontal collapse
 * @copyright Kplian Ltda 2020
 * @uthor Israel Colque
 */
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: 'auto',
    height: '40px',
  },
}));

const Logo = ({ src: logoSrc }) => {
  const url = process.env.REACT_APP_URL_LOGO || null;
  const src = url || logoSrc || '/images/logo.jpg';
  const classes = useStyles();
  return <img alt="Logo" src={src} className={classes.root} />;
};

export default Logo;
