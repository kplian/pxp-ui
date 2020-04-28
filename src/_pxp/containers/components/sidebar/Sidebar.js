import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer, Box, Hidden } from '@material-ui/core';
import Profile from './Profile';
import SidebarNav from './SideBarNav';
import PerfectScrollbar from 'react-perfect-scrollbar';
import clsx from 'clsx';
import Logo from '../Logo';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 256,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(0)
  },
  divider: {
   //  backgroundColor: '#444755 !important',
  },
  nav: {
    marginBottom: theme.spacing(2)
  },
  boxDrawer: {
   //  borderRight: '1px solid #444755',
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;  
  const classes = useStyles();
  const menu = useSelector(state => state.auth.menu);


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
        className={ clsx( classes.boxDrawer, className )}
      >
        <PerfectScrollbar options={{ suppressScrollX: true }}>
              <Hidden lgUp>
                <Box
                  p={2}
                  display="flex"
                  justifyContent="center"
                >
                  <RouterLink to="/">
                    <Logo />
                  </RouterLink>
                </Box>
            </Hidden>
            <Box p={2}>
              <Profile />
            </Box>
            <Divider className={classes.divider} />
            <Box p={2}>
              <SidebarNav
                className={classes.nav}                
                menu={menu}
              />        
            </Box>
 
        </PerfectScrollbar>
      </Box>
    </Drawer>
  );
};

export default Sidebar;