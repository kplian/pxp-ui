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
import ArrowBack from '@material-ui/icons/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import Logo from './Logo';
import eventsService from '../../eventsService';

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
          backgroundColor: theme.palette.background.default,
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
  const { onSidebarOpen } = props;

  const classes = useStyles();
  // get notifications from redux
  const [notifications] = useState([]);
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.app.detailPage);

  const onGoBackButton = () => {
    eventsService.triggerEvent('detail_go_back', detail.masterDetailId);
  };

  return (
    <AppBar className={classes.root}>
      {detail.isDetail && (
        <Toolbar>
          <IconButton color="inherit" onClick={onGoBackButton}>
            <ArrowBack />
          </IconButton>
        </Toolbar>
      )}
      {!detail.isDetail && (
        <Toolbar>
          <Hidden mdUp>
            <IconButton color="inherit" onClick={onSidebarOpen}>
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Hidden smDown>
            <RouterLink to="/" className={classes.logo}>
              <Logo />
            </RouterLink>
          </Hidden>
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
      )}
    </AppBar>
  );
};

export default Topbar;
