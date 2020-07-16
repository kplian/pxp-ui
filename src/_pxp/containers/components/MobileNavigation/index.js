import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PxpClient, {
  removeWebSocketListener,
  webSocketListener,
} from 'pxp-client';
import { v4 as uuidv4 } from 'uuid';
import { newNotifyAction } from '../../../actions/notify';
import usePages from '../../../hooks/usePages';
import useNotification from '../../../hooks/useNotification';
import { createNotification } from '../../../utils/createNotification';
import { startLogout } from '../../../actions/auth';
// SOCKETS
import LoginDialog from '../../../../native_citas/containers/components/LoginDialog';

const uuid = uuidv4();

const BottomNavigationCustom = withStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
}))(BottomNavigation);

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
  selected: {
    color: `${theme.palette.secondary.main} !important`,
  },
}));

const useStylesAction = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&$selected > :first-child': {
      top: '-7px',
      maxWidth: '60px !important',
      minWidth: '60px !important',
      color: `${theme.palette.text.primary} !important`,
      position: 'relative',
      width: '60px',
      height: '34.64px',
      backgroundColor: theme.palette.primary.dark,
      zIndex: 100,
      // margin: '17.32px 0',
      '&:after, &:before': {
        content: '"" !important',
        position: 'absolute',
        width: 0,
        borderLeft: '30px solid transparent',
        borderRight: '30px solid transparent',
      },
      '&:before': {
        bottom: '100%',
        borderBottom: `17.32px solid ${theme.palette.primary.dark}`,
      },
      '&:after': {
        top: '100%',
        borderTop: `17.32px solid ${theme.palette.primary.dark}`,
      },
    },
    '&$selected > :first-child > :nth-child(2)': {
      display: 'none',
    },
    '&$selected > :first-child > :first-child >:first-child': {
      fontSize: '2.3rem',
      color: theme.palette.secondary.light,
    },
    '&$selected > :first-child > :first-child': {
      fontSize: '2.3rem',
      color: theme.palette.secondary.light,
    },
  },
  selected: {
    fontSize: '0.8rem',
    paddingTop: '0px !important',
    color: `${theme.palette.text.primary} !important`,
  },
}));

const generateItems = (menu, components) =>
  menu.map((item) => {
    const cmp = components[item.component];
    const notify = {};

    if (cmp && cmp.showNotify) {
      notify.showNotify = cmp.showNotify;
      notify.eventListener = cmp.eventListener;
    }

    return {
      icon: item.icon,
      label: item.text,
      path: cmp ? cmp.path : '/',
      ...notify,
    };
  });

const MobileNavigation = ({ actions }) => {
  const classes = useStyles();
  const classesAction = useStylesAction();
  const location = useLocation();
  const notifyData = useNotification();

  const menu = useSelector((state) => state.auth.menu);
  const { pages: components } = usePages();
  const options = actions || generateItems(menu, components);
  // I-SOCKETS
  const [count, setCount] = useState(0);
  const eventNty = options.find((opt) => opt.showNotify);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // F-SOCKETS

  const [value, setValue] = useState(0);

  const activeLink = (routes = []) => {
    let index = 0;
    routes.forEach((route, i) => {
      if (location.pathname.includes(route.path)) {
        index = i;
      }
    });
    return index;
  };

  useEffect(() => {
    setValue(activeLink(options));
  }, [location]);

  useEffect(() => {
    localStorage.setItem('notify', count);
  }, [count]);

  useEffect(() => {
    if (options[value].showNotify) {
      setCount(0);
    }
  }, [value]);

  const clearEvents = () => {
    if (eventNty) {
      removeWebSocketListener({
        idComponent: uuid,
        event: eventNty.eventListener(auth.currentUser.id_usuario),
      });
    }
  };

  useEffect(() => {
    if (eventNty) {
      // window.addEventListener('beforeunload', clearEvents);
      webSocketListener({
        event: eventNty.eventListener(auth.currentUser.id_usuario),
        idComponent: uuid,
        handle: (e) => {
          console.log('[PXP]', PxpClient);
          const countNow = parseInt(localStorage.getItem('notify') || 0);
          setCount(countNow + 1);
          createNotification(e);
          dispatch(newNotifyAction(e));
        },
      });
    }

    return () => {
      window.removeEventListener('beforeunload', clearEvents);
    };
  }, []);

  return (
    <BottomNavigationCustom
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      {options.slice(0, 5).map((item) => (
        <BottomNavigationAction
          key={item.label}
          classes={classesAction}
          label={item.label}
          component={Link}
          to={item.path}
          icon={
            <Notify
              visible={item.showNotify && item.path !== options[value].path}
              value={count}
              icon={item.icon}
            />
          }
        />
      ))}
      <MoreMenu />
    </BottomNavigationCustom>
  );
};

export default MobileNavigation;

const Notify = ({ visible, value = 0, icon }) => {
  return (
    <>
      {visible ? (
        <Badge color="secondary" badgeContent={value} style={{ zIndex: 100 }}>
          <Icon>{icon}</Icon>
        </Badge>
      ) : (
          <Icon>{icon}</Icon>
        )}
    </>
  );
};

const useStylesMore = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '0 10px 10px 0',
    opacity: '0.8',
    position: 'absolute',
    left: 0,
    top: '-60px',
    zIndex: 100,
  },
}));

const MoreButton = withStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
    padding: '8px',
  },
}))(IconButton);

const MoreMenu = () => {
  const classes = useStylesMore();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(startLogout());
    setAnchorEl(null);
  };

  const handleClean = () => {
    window.location.reload(true);
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <MoreButton onClick={handleClick}>
        <Icon fontSize="small">settings</Icon>
      </MoreButton>
      <Drawer
        id="more-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchor="bottom"
      >
        <List>
          <ListItem button onClick={handleClean}>
            <ListItemIcon>
              <Icon>refresh</Icon>
            </ListItemIcon>
            <Typography variant="inherit">Recargar aplicación</Typography>
          </ListItem>
          <Divider />
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <Icon>exit_to_app</Icon>
            </ListItemIcon>
            <Typography variant="inherit">Cerrar sesión</Typography>
          </ListItem>
          <Divider />

          <ListItem />
        </List>
      </Drawer>
    </div>
  );
};
