import React from 'react';
import { useRouteMatch, useHistory , Link as RouterLink } from 'react-router-dom';

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
  makeStyles,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import * as _ from 'lodash';
import { useSelector } from 'react-redux';
import history from '../routers/History';
import usePages from '../hooks/usePages';

const useStyles = makeStyles((theme) => ({
  root: {},
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1),
    },
  },
  actionIcon: {
    marginRight: theme.spacing(1),
  },
}));

function generateNames(pages = [], menu, match) {
  const values = _.compact(match.path.split('/'));

  let matches = []; let
    temp = '';
  values.map((item) => {
    temp = `${temp  }/${  item}`;
    matches.push(temp);
  });

  const results = _.compact(
    Object.keys(pages).map((key) => {
      if (_.includes(matches, pages[key].path)) {
        return { ...pages[key], name: key };
      } else {
        return null;
      }
    }),
  );

  // function findByText(data, text) {
  //   for(var i = 0; i < data.length; i++) {
  //       if (data[i].component === text) {
  //           return data[i];
  //       } else if (data[i].childrens && data[i].childrens.length && typeof data[i].childrens === "object") {
  //           return findByText(data[i].childrens, text);
  //       }
  //   }
  // }

  function recursiveChild(array) {
    const arrayAux = [];
    array.forEach((item) => {
      arrayAux.push(item);
      if (item.childrens && item.childrens.length > 0) {
        arrayAux.push(...recursiveChild(item.childrens));
      }
    });
    return arrayAux;
  }

  return results.map((page) => {
    const item = _.find(recursiveChild(menu), { component: page.name });
    return { ...page, text: item && item.text ? item.text : 'None' };
  });
}

function BreadcrumbsPxp({ className, ...rest }) {
  const classes = useStyles();

  const menu = useSelector((state) => state.auth.menu);
  // const history = useHistory();
  console.log('history', history);
  const { pages } = usePages();
  const match = useRouteMatch();
  const breads = generateNames(pages, menu, match);

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
          {breads.map((bread, i) => (
            <Link
              key={bread.text}
              variant="body1"
              color={i === breads.length - 1 ? 'textPrimary' : 'inherit'}
              to={bread.path}
              component={RouterLink}
            >
              {bread.text}
            </Link>
          ))}
        </Breadcrumbs>
        {
          // <Typography
          //   variant="h3"
          //   color="textPrimary"
          // >
          //     { breads && _.last(breads).text }
          // </Typography>
        }
      </Grid>
    </Grid>
  );
}

BreadcrumbsPxp.propTypes = {
  className: PropTypes.string,
};

export default BreadcrumbsPxp;
