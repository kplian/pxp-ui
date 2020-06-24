import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import usePages from '../../../hooks/usePages';

const BottomNavigationCustom = withStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  }
}))(BottomNavigation);

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
  selected: {
    color: theme.palette.secondary.main + ' !important',
  }
}));

const useStylesAction = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&$selected > :first-child': {
      top: '-7px',
      maxWidth: '60px !important',
      minWidth: '60px !important',
      color: theme.palette.text.primary + ' !important',
      position: 'relative',
      width: '60px',
      height: '34.64px',
      backgroundColor: theme.palette.primary.dark,
      zIndex: 100,
      // margin: '17.32px 0',
      "&:after, &:before": {
        content: '"" !important',
        position: 'absolute',
        width: 0,
        borderLeft: '30px solid transparent',
        borderRight: '30px solid transparent',
      },
      '&:before': {
        bottom: '100%',
        borderBottom: '17.32px solid ' + theme.palette.primary.dark,
      },
      '&:after': {
        top: '100%',
        borderTop: '17.32px solid ' + theme.palette.primary.dark,
      }

    },
    '&$selected > :first-child > :nth-child(2)': {
      display: 'none'
    },
    '&$selected > :first-child > :first-child': {
      fontSize: '2.3rem',
      color: theme.palette.secondary.light,
    }
  },
  selected: {
    fontSize: '0.8rem',
    paddingTop: '0px !important',
    color: theme.palette.text.primary + ' !important',
  }
}));


const generateItems = (menu, components) => {
  return menu.map(item => {
    return {
      icon: item.icon,
      label: item.text,
      path: components[item.component] ? components[item.component].path : '/'
    };
  });
};

const MobileNavigation = ({ actions }) => {
  const classes = useStyles();
  const classesAction = useStylesAction();
  const location = useLocation();
  const menu = useSelector((state) => state.auth.menu);

  const activeLink = (routes = []) => {
    let index = 0;
    routes.forEach((route, i) => {
      if (route.path === location.pathname) {
        index = i;
      }
    })
    return index;
  };

  const { pages: components } = usePages();

  const options = actions || generateItems(menu, components);
  const [value, setValue] = React.useState(activeLink(options));

  return (
    <BottomNavigationCustom
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      {
        options.slice(0, 3).map(item => (
          <BottomNavigationAction
            key={item.label}
            classes={classesAction}
            label={item.label}
            component={Link}
            to={item.path}
            icon={<Icon style={{ zIndex: 100 }}>{item.icon}</Icon>}
          />
        ))
      }
    </BottomNavigationCustom>
  );
}

export default MobileNavigation;
