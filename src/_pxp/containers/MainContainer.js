/**
 * Main container for logged in users
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import Topbar from './components/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import LoginDialog from './components/LoginDialog';
import Breadcrumbs from '../utils/Breadcrumbs';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64,
    },
  },
  shiftContent: {
    paddingLeft: 256,
  },
  content: {
    flex: '1 1 auto',
    height: 'calc( 100vh - 80px)',
    width: '100%',
    padding: 16,
    overflow: 'hidden',
  },
}));

const MainContainer = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  // const user = useSelector((state) => state.auth.currentUser.user);
  const currentUser = useSelector((state) => state.auth.currentUser.user);
  console.log(currentUser);
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;
  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop,
      })}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />

      <main className={classes.content}>
        <Breadcrumbs />
        {children}
      </main>

      <LoginDialog username={currentUser} />
    </div>
  );
};

export default MainContainer;
