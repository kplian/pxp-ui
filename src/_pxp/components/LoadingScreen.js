/**
 * Loading Component, Circular Progress in the viewport
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import React from 'react';
import clsx from 'clsx';
import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    opacity: 0.7,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    padding: theme.spacing(3),
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

function LoadingScreen({ className }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <CircularProgress />
    </div>
  );
}

export default LoadingScreen;
