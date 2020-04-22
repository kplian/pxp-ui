import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import Footer from './components/Footer.js';
import Topbar from './components/Topbar.js';
import Sidebar from './components/sidebar/Sidebar.js';
import LoginDialog from '../containers/components/LoginDialog';
import Breadcrumbs from '../utils/Breadcrumbs';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    width: '100%',
    padding: 10,
  }
}));

const MainContainer = ({ children }) => {  
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
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
        [classes.shiftContent]: isDesktop
      })}
    >
    {console.log('render main container')}
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}        
      />
      <main className={classes.content}>
        <Breadcrumbs/>
        {children}
        <Footer />
      </main>
      <LoginDialog />
    </div>
  );
};

export default MainContainer;