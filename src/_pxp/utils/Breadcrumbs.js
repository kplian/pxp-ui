/**
 * BreadCrumbs component to navigate forward and back
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import React from 'react';
import { useRouteMatch, Link as RouterLink } from 'react-router-dom';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Breadcrumbs, Grid, Link, makeStyles } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import * as _ from 'lodash';
import { useSelector } from 'react-redux';
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
  const matches = [];
  let temp = '';
  values.forEach((item) => {
    temp = `${temp}/${item}`;
    matches.push(temp);
  });

  const results = _.compact(
    Object.keys(pages).map((key) => {
      if (_.includes(matches, pages[key].path)) {
        return { ...pages[key], name: key };
      }
      return null;
    }),
  );

  function recursiveChild(array) {
    const arrayAux = [];
    array.forEach((item) => {
      arrayAux.push(item);
      if (item.children && item.children.length > 0) {
        arrayAux.push(...recursiveChild(item.children));
      }
    });
    return arrayAux;
  }

  return results.map((page) => {
    const item = _.find(recursiveChild(menu), { component: page.name });
    return { ...page, text: item && item.text ? item.text : 'None' };
  });
}

function BreadcrumbsPxp({ className }) {
  const classes = useStyles();

  const menu = useSelector((state) => state.auth.menu);
  // const history = useHistory();
  const { pages } = usePages();
  const match = useRouteMatch();
  const breads = generateNames(pages, menu, match);

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justify="space-between"
      spacing={3}
    >
      <Grid item>
        <Breadcrumbs
          maxItems={3}
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
