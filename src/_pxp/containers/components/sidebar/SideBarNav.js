/**
 * Menu section
 * @copyright Kplian Ltda 2020
 * @uthor Israel Colque
 */
import React from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { List, ListSubheader } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import usePages from '../../../hooks/usePages';

import NavItem from './NavItem';

function renderNavItems({ components, items = [], key = '', ...rest }) {
  return (
    <List disablePadding key={key}>
      {items.reduce(
        // eslint-disable-next-line no-use-before-define
        (acum, item) => renderChildRoutes({ components, acum, item, ...rest }),
        [],
      )}
    </List>
  );
}

function renderChildRoutes({
  components = {},
  acum,
  pathname,
  item,
  depth = 0,
}) {
  const key = item.text + depth;

  if (item.childrens && item.childrens.length > 0) {
    const open = matchPath(pathname, {
      path: item.component,
      exact: true,
    });

    acum.push(
      <NavItem
        depth={depth}
        key={key}
        open={Boolean(open)}
        icon={item.icon}
        title={item.text}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.childrens,
          components,
        })}
      </NavItem>,
    );
  } else {
    acum.push(
      <NavItem
        depth={depth}
        href={
          components[item.component] ? components[item.component].path : '/'
        }
        icon={item.icon}
        key={key}
        info={item.info}
        title={item.text}
      />,
    );
  }
  return acum;
}

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    // borderBottom: '1px solid #444755',
  },
  subheader: {
    lineHeight: '30px',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
  },
  icon: {
    top: '6px',
    position: 'relative',
    color: theme.palette.icon,
    width: 24,
    height: 24,
    alignItems: 'center',
    marginRight: theme.spacing(1),
  },
}));

const SidebarNav = (props) => {
  const { menu, className } = props;
  const location = useLocation();
  const classes = useStyles();
  const { pages: components } = usePages();

  return (
    <div>
      {menu.map((page) => {
        let content = null;
        if (page.type === 'carpeta') {
          content = (
            <List
              key={page.text}
              className={clsx(classes.header, className)}
              subheader={
                <ListSubheader
                  disableGutters
                  disableSticky
                  className={classes.subheader}
                >
                  {page.icon && (
                    <Icon className={classes.icon}>{page.icon}</Icon>
                  )}
                  <span>{page.text}</span>
                </ListSubheader>
              }
            >
              {renderNavItems({
                components,
                items: page.childrens,
                pathname: location.pathname,
              })}
            </List>
          );
        } else {
          content = renderNavItems({
            components,
            items: [page],
            key: page.text,
            pathname: location.pathname,
          });
        }
        return content;
      })}
    </div>
  );
};

export default SidebarNav;
