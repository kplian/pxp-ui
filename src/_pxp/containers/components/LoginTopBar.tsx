/**
 * Topbar section for logged in users
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '54px',
    [theme.breakpoints.up('sm')]: {
      height: '70px',
    },
    zIndex: theme.zIndex.drawer + 100,
    backgroundColor: 'white',
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
  logo: {
    // backgroundColor: theme.palette.background.paper,
    // borderRadius: '5px',
    // paddingLeft: '5px',
    // paddingRight: '5px',
    // paddingTop: '5px',
  },
}));

const PublicTopbar = () => {
  const classes = useStyles();

  return <AppBar className={classes.root} />;
};

export default PublicTopbar;
