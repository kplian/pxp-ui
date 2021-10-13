/**
 * Loading Component, Circular Progress in the viewport
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import React from 'react';
import clsx from 'clsx';
import { CircularProgress } from '@mui/material';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles: any = makeStyles((theme:Theme) => ({
  root: {
    alignItems: 'center',
    // backgroundColor: theme.palette.background.default,
    opacity: 0.7,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    padding: '24px',//theme.spacing(3),
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 2000,
  },
  logo: {
    width: 200,
    maxWidth: '100%',
  },
}));

function LoadingScreen({ className = undefined }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <CircularProgress />
    </div>
  );
}

export default LoadingScreen;
