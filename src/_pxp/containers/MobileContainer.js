import React from 'react';
import MobileNavigation from './components/MobileNavigation';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import zIndex from '@material-ui/core/styles/zIndex';
import { Scrollbars } from 'react-custom-scrollbars';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    maxHeight: '100%',
    maxWidth: '100%',
    position: 'relative'
    //   [theme.breakpoints.up('sm')]: {
    //     paddingTop: 64,
    //   },
  },
  content: {
    background: theme.palette.background.dark,
    // background: '#cb2d3e',  /* fallback for old browsers */
    // background: 'linear-gradient(to bottom, #cb2d3e 80%, #ef473a)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    flex: '1 1 auto',
    height: 'calc( 100vh - 56px)',
    maxHeight: 'calc( 100vh - 56px)',
    width: '100%',
    padding: '1px 0px 1px 0px',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      // padding: '16px 0px 16px 0px',
    },
  },
  bottomNav: {
    maxWidth: '100%',
    width: '100%',
    position: 'fixed',
    bottom: '0',
    left: '0',
    zIndex: 1000,
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.31), 0px -1px 8px 2px rgba(0,0,0,0.40)',
  }
}));

const MobileContainer = ({ children }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx({
        [classes.root]: true,
      })}
    >
      <div className={clsx(classes.content)}>
        {children}
        {
          //   <Scrollbars
          //   id='content'
          //   autoHide
          //   renderView={props => (
          //     <div {...props} style={{ ...props.style, overflowX: 'hidden', marginBottom: 0 }} />
          //   )}
          // >
          //   {children}
          // </Scrollbars>
        }
      </div>

      <div className={clsx(classes.bottomNav)}>
        <MobileNavigation />
      </div>

    </div>
  )
};


export default MobileContainer;
