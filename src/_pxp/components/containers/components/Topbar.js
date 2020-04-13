import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { startLogout } from '../../../actions/auth';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { onSidebarOpen, ...rest } = props;

  const classes = useStyles();
  //get notifications from redux
  const [notifications] = useState([]);

  return (
    <AppBar
      {...rest}
      className={classes.root}
    >
      <Toolbar> 
        <Hidden lgUp>
            <IconButton
                color="inherit"
                onClick={onSidebarOpen}
            >
                <MenuIcon />
            </IconButton>
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
        <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={() => {startLogout()}}
          >
            <InputIcon />
        </IconButton>
            
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;