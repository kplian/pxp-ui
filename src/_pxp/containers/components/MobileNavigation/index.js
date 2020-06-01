import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';



const BottomNavigationCustom = withStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.primary.dark,
    '&$selected': {

      color: theme.palette.secondary.main + ' !important',
    },
  }
}))(BottomNavigation);

const useStyles = makeStyles((theme) => ({
  root: {

  },
  action: {
    '&$selected': {
      paddingTop: 6,
      color: theme.palette.secondary.main + ' !important',
    },
  }
}));

const MobileNavigation = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigationCustom
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction className={classes.action} label="Discover" icon={<Icon>people</Icon>} />      
      <BottomNavigationAction className={classes.action} label="Nearby" icon={<Icon>map</Icon>} />
      <BottomNavigationAction className={classes.action} label="Favorites" icon={<Icon>favorite</Icon>} />
      <BottomNavigationAction className={classes.action} label="Chat" icon={<Icon>chat</Icon>} />
    </BottomNavigationCustom>
  );
}

export default MobileNavigation;
