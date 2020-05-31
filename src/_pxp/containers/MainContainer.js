/**
 * Main container for logged in users
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import React, { useState, useEffect } from 'react';
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
  breadcrumbs: {
    padding: '16px 0px 16px 0px',
  },
  content: {
    flex: '1 1 auto',
    height: 'calc( 100vh - 80px)',
    width: '100%',
    padding: '0px 16px 16px 16px',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      padding: '0px 0px 16px 0px',
    },
  },
}));

const MainContainer = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const currentUser = useSelector((state) => state.auth.currentUser.user);
  const [openSidebar, setOpenSidebar] = useState(isDesktop);
  const detail = useSelector((state) => state.app.detailPage);
  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };
  useEffect(() => {
    setOpenSidebar(isDesktop);
  }, [isDesktop]);

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop && openSidebar,
      })}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} openSidebar={openSidebar} />
      <Sidebar
        onClose={handleSidebarClose}
        open={openSidebar}
        isDesktop={isDesktop}
        variant={isDesktop && openSidebar ? 'permanent' : 'temporary'}
      />

      <main className={classes.content}>
        {!detail.isDetail && <Breadcrumbs className={classes.breadcrumbs} />}
        {children}
      </main>

      <LoginDialog username={currentUser} />
    </div>
  );
};

export default MainContainer;
