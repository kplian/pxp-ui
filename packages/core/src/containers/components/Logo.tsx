/**
 * Collapse with horizontal collapse
 * @copyright Kplian Ltda 2020
 * @uthor Israel Colque
 */
import React, { FC } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles: any = makeStyles(() => ({
  root: {
    width: 'auto',
    height: '40px',
  },
}));

const Logo: FC<any> = ({ src: logoSrc }) => {
  const url = process.env.PUBLIC_URL + process.env.REACT_APP_URL_LOGO || null;
  const src = url || logoSrc || '/images/logo.jpg';
  const classes = useStyles();
  return <img alt="Logo" src={src} className={classes.root} />;
};

export default Logo;
