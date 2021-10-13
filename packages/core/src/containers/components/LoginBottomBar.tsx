/**
 * Topbar section for logged in users
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import React from 'react';
import { makeStyles } from '@mui/styles';
import { AppBar, Theme } from '@mui/material';

const useStyles: any = makeStyles((theme: Theme) => ({
  root: {
    height: '54px',
    [theme.breakpoints.up('sm')]: {
      height: '70px',
    },
    zIndex: theme.zIndex.drawer + 100,
    backgroundColor: theme.palette.primary.main,
    top: 'auto',
    bottom: 0,
  },
}));

const PublicBottomBar = () => {
  const classes = useStyles();

  return <AppBar position="fixed" className={classes.root} />;
};

export default PublicBottomBar;
