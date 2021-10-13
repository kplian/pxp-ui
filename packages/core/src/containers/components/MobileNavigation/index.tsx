import React, { useEffect, useState, FC } from 'react';
import { makeStyles, withStyles } from '@mui/styles';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PxpClient, {
  removeWebSocketListener,
  webSocketListener,
} from 'pxp-client';
import { v4 as uuidv4 } from 'uuid';
import { newNotifyAction } from '../../../actions/notify';
import usePages from '../../../context/usePages';
import { useNotification } from '@pxp-ui/hooks';
// import { createNotification } from '../../../utils/createNotification';
import { startLogout } from '../../../actions/auth';
import { Theme } from '@mui/material';
// SOCKETS

const uuid = uuidv4();

const BottomNavigationCustom = withStyles((theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
}))(BottomNavigation);

const useStyles: any = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
  selected: {
    color: `${theme.palette.secondary.main} !important`,
  },
}));

const useStylesAction: any = makeStyles((theme: Theme) => ({
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
    const notify: any = {};

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
export declare interface MobileNavProps {
  actions?: any;
}

const MobileNavigation: FC<MobileNavProps> = ({ actions }) => {
  const classes = useStyles();
  const classesAction = useStylesAction();
  const location = useLocation();
  const notifyData = useNotification();

  const menu = useSelector((state: any) => state.auth.menu);
  const { pages: components } = usePages();
  const options = actions || generateItems(menu, components);
  // I-SOCKETS
  const [count, setCount] = useState(0);
  const eventNty = options.find((opt) => opt.showNotify);
  const auth = useSelector((state: any) => state.auth);
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
    localStorage.setItem('notify', count.toString());
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
        event: eventNty.eventListener(auth.currentUser.userId),
      });
    }
  };

  useEffect(() => {
    if (eventNty) {
      // window.addEventListener('beforeunload', clearEvents);
      webSocketListener({
        event: eventNty.eventListener(auth.currentUser.userId),
        idComponent: uuid,
        handle: (e) => {
          const countNow = parseInt(localStorage.getItem('notify') || '0');
          setCount(countNow + 1);
          // createNotification(e);
          dispatch(newNotifyAction(e));
        },
      });
    }

    return () => {
      // window.removeEventListener('beforeunload', clearEvents);
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

const useStylesMore: any = makeStyles((theme: Theme) => ({
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
    window.location.reload();
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
