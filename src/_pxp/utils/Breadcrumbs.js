import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import PlusCircleIcon from '@material-ui/icons/AddCircleOutline';
import DownloadIcon from '@material-ui/icons/GetApp';
import UploadIcon from '@material-ui/icons/Publish';
// import {
//   PlusCircle as PlusCircleIcon,
//   Download as DownloadIcon,
//   Upload as UploadIcon
// } from 'react-feather';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {},
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  actionIcon: {
    marginRight: theme.spacing(1)
  }
}));

function BreadcrumbsPxp({ pages, className, ...rest }) {
  const classes = useStyles();
  const menu = useSelector(state => state.auth.menu);

    console.log('pages', pages, menu);
    
  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justify="space-between"
      spacing={3}
      {...rest}
    >
      <Grid item>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            variant="body1"
            color="inherit"
            to="/app"
            component={RouterLink}
          >
            Dashboard
          </Link>
          <Link
            variant="body1"
            color="inherit"
            to="/app/management"
            component={RouterLink}
          >
            Management
          </Link>
          <Typography
            variant="body1"
            color="textPrimary"
          >
            Customers
          </Typography>
        </Breadcrumbs>
        <Typography
          variant="h3"
          color="textPrimary"
        >
          All Customers
        </Typography>
        <Box mt={2}>
          <Button className={classes.action}>
            <SvgIcon
              fontSize="small"
              className={classes.actionIcon}
            >
              <UploadIcon />
            </SvgIcon>
            Import
          </Button>
          <Button className={classes.action}>
            <SvgIcon
              fontSize="small"
              className={classes.actionIcon}
            >
              <DownloadIcon />
            </SvgIcon>
            Export
          </Button>
        </Box>
      </Grid>
      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          className={classes.action}
        >
          <SvgIcon
            fontSize="small"
            className={classes.actionIcon}
          >
            <PlusCircleIcon />
          </SvgIcon>
          New Customer
        </Button>
      </Grid>
    </Grid>
  );
}

BreadcrumbsPxp.propTypes = {
  className: PropTypes.string
};

export default BreadcrumbsPxp;
