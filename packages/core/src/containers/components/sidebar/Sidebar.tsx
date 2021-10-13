/**
 * Menu and profile container for logged in users
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Divider, Drawer, Box, IconButton } from '@mui/material';
import { Scrollbars } from 'react-custom-scrollbars-2';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import clsx from 'clsx';
import Profile from './Profile';
import SidebarNav from './SideBarNav';

const useStyles: any = makeStyles((theme: any) => ({
  drawer: {
    width: 256,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)',
    },
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(0),
  },
  divider: {
    //  backgroundColor: '#444755 !important',
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
  boxDrawer: {
    //  borderRight: '1px solid #444755',
  },
}));

const Sidebar = (props) => {
  const { open, variant, onClose, className, isDesktop } = props;
  const classes = useStyles();
  const menu = useSelector((state: any) => state.auth.menu);

  const location = useLocation();
  // close menu on path change
  useEffect(() => {
    if (!isDesktop && open && onClose) {
      onClose();
    }
  }, [location.pathname]);

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        className={clsx(classes.boxDrawer, className)}
      >
        <Scrollbars>
          <Box p={2} display="flex" justifyContent="center">
            <IconButton
              color="inherit"
              onClick={() => {
                onClose();
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
          </Box>

          <Box p={2}>
            <Profile />
          </Box>
          <Divider className={classes.divider} />
          <Box p={2}>
            <SidebarNav className={classes.nav} menu={menu} />
          </Box>
        </Scrollbars>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
