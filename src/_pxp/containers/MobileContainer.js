import React from 'react';
import MobileNavigation from './components/MobileNavigation';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
const useStyles = makeStyles((theme) => ({
    root: {
      height: '100%',
      maxHeight: '100%',
      maxWidth: '100%',

    //   [theme.breakpoints.up('sm')]: {
    //     paddingTop: 64,
    //   },
    },
    content: {
      // background: '#cb2d3e',  /* fallback for old browsers */
      // background: 'linear-gradient(to bottom, #cb2d3e 80%, #ef473a)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      flex: '1 1 auto',
      height: 'calc( 100vh - 56px)',
      width: '100%',
      padding: '16px',
      overflow: 'hidden',
      [theme.breakpoints.down('sm')]: {
        padding: '16px 0px 16px 0px',
      },
    },
    bottomNav: {
        maxWidth: '100%',
    }
  }));
  
const MobileContainer = ({children}) => {
    const classes = useStyles();

    return (
        <div
            className={clsx({
                [classes.root]: true,
            })}
        >
            <div className={clsx(classes.content)}>
                <h2>Mobile</h2>
                {children}
            </div>
            <MobileNavigation className={clsx(classes.bottomNav)}/>
        </div>
    )
};


export default MobileContainer;
