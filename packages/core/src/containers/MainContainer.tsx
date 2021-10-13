/**
 * Main container for logged in users
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@mui/styles';
import { Theme, useMediaQuery } from '@mui/material';
import Topbar from './components/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import LoginDialog from './components/LoginDialog';

const useStyles: any = makeStyles((theme: Theme) => {
  return {
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
      height: 'calc( 100vh - 64px)',
      width: '100%',
      padding: '0px 16px 16px 16px',
      overflow: 'hidden',
      [theme.breakpoints.down('sm')]: {
        padding: '0px 0px 16px 0px',
        paddingBottom: 0,
      },
      [theme.breakpoints.down('xs')]: {
        paddingBottom: 0,
      },
    },
  };
});

const MainContainer = ({ children }) => {
  const classes = useStyles();
  const theme: Theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const currentUser = useSelector((state: any) => state.auth.currentUser.user);
  const [openSidebar, setOpenSidebar] = useState(isDesktop);
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
      <main className={classes.content}>{children}</main>

      <LoginDialog username={currentUser} />
    </div>
  );
};

export default MainContainer;
