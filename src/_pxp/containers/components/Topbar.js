/**
 * Topbar section for logged in users
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth';
import Logo from './Logo';

import Settings from './Settings';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    ...(theme.name === 'LIGHT'
      ? {
          boxShadow: 'none',
          backgroundColor: theme.palette.primary.main,
        }
      : {}),
    ...(theme.name === 'ONE_DARK'
      ? {
          backgroundColor: theme.palette.background.paper,
        }
      : {}),
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

const Topbar = (props) => {
  const { onSidebarOpen, openSidebar } = props;

  const classes = useStyles();
  // get notifications from redux
  const [notifications] = useState([]);
  const dispatch = useDispatch();

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        {!openSidebar && (
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        )}
        {openSidebar && (
          <RouterLink to="/" className={classes.logo}>
            <Logo />
          </RouterLink>
        )}
        <div className={classes.flexGrow} />

        <IconButton color="inherit">
          <Badge
            badgeContent={notifications.length}
            color="primary"
            variant="dot"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Settings />
        <IconButton
          className={classes.signOutButton}
          color="inherit"
          onClick={() => {
            dispatch(startLogout());
          }}
        >
          <InputIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
