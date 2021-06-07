/**
 * Login conntainer for pxp applications
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import TopBar from './components/LoginTopBar';
import BottomBar from './components/LoginBottomBar';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 54,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 70,
    },
  },
  content: {
    flex: '1 1 auto',
    height: 'calc( 100vh - 70px)',
    width: '100%',
    padding: '0px 16px 16px 16px',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      padding: '0px 0px 16px 0px',
    },
  },
}));

const LoginContainer = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TopBar />
      <main className={classes.content}>{children}</main>
      <BottomBar />
    </div>
  );
};

export default LoginContainer;
