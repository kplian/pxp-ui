import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Footer from './components/Footer';
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
    height: 'calc( 100vh - 64px)',
    width: '100%',
    padding: 10,
  },
}));

const MainContainer = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });

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
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <main className={classes.content}>
          <Breadcrumbs />
          {children}
          <Footer />
        </main>
      </PerfectScrollbar>
      <LoginDialog />
    </div>
  );
};

export default MainContainer;
