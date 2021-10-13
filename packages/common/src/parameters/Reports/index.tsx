/* eslint-disable import/no-cycle */
import React, { useEffect } from 'react';
import { Grid, Hidden, IconButton, Fab, Drawer } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { makeStyles } from '@material-ui/core/styles';
import ViewReport from './ViewReport';
import Pxp from '@pxp-ui/core/Pxp';
import ConfigReport from './ConfigReport';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'relative',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
    zIndex: theme.zIndex.modal,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  empty: {
    paddingTop: theme.spacing(4),
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  // necessary for content to be below app bar
  drawerPaper: {
    width: drawerWidth,
    position: 'relative',
  },
  content: {
    flexGrow: 1,
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0),
    },
  },
}));

const Reports = () => {
  const { path, url } = useRouteMatch();
  const [columns, setColumns] = React.useState([]);
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    Pxp.apiClient
      .doRequest({
        url: `reports/groups`,
        method: 'GET',
      })
      .then(setColumns);
  }, []);

  return (
    <div className={classes.root} id="drawer-report-container">
      <Fab
        size="small"
        color="secondary"
        aria-label="Report List"
        className={classes.menuButton}
        onClick={handleDrawerToggle}
      >
        <MenuOpenIcon />
      </Fab>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={document.getElementById('drawer-report-container')}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <ConfigReport columns={columns} onRowClick={handleDrawerToggle} />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <ConfigReport columns={columns} />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <Switch>
          <Route exact path={path}>
            <h3 className={classes.empty}>Please select a report.</h3>
          </Route>
          <Route path={`${path}/:reportId`}>
            <ViewReport />
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default Reports;
