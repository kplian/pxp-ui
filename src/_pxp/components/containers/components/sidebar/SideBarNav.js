import React from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { List, ListSubheader } from '@material-ui/core';
import { colors } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';


import NavItem from './NavItem';

const useStyles = makeStyles(theme => ({
  root: {},
  header: {
    borderBottom: `1px solid ${ colors.grey[300]}`
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
    marginRight: theme.spacing(1)
  },
}));

const SidebarNav = props => {
  const { pages, className, ...rest } = props;
  console.log('pages', pages);
  
  const location = useLocation();

  const classes = useStyles();

  return (
    <div>
    { pages.map(page => {
      let content = null;
      if (page.type === 'carpeta') {
        console.log('carpeta', page);
        
        content = (
          <List
              key={page.text}
              className= { classes.header }
              subheader={(
                <ListSubheader
                  disableGutters
                  disableSticky
                  className={ classes.subheader }
                >
                 { page.icon && <Icon className={ classes.icon }>{page.icon}</Icon>} 
                 <span>{page.text}</span>
                </ListSubheader>
              )}
            >
              {renderNavItems({ items: page.childrens, pathname: location.pathname })}
          </List>
        );
      } else {
        content = renderNavItems({ items: [page], key: page.text, pathname: location.pathname })
      }
      return (content)
    })}
    </div>
  );
};

export default SidebarNav;

function renderNavItems({ items = [], key='', ...rest }) {
  return (
    <List disablePadding key={key}>
      {
        items.reduce((acum, item) => renderChildRoutes({ acum, item, ...rest }),[])
      }
    </List>
  );
}

function renderChildRoutes({ acum, pathname, item, depth = 0 }) {
  const key = item.text + depth;

  if (item.childrens && item.childrens.length > 0) {
    const open = matchPath(pathname, {
      path: item.component,
      exact: true
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
          items: item.childrens
        })}
      </NavItem>
    );
  } else {
    acum.push(
      <NavItem
        depth={depth}
        href={item.component}
        icon={item.icon}
        key={key}
        info={item.info}
        title={item.text}
      />
    );
  }
  return acum;
}
