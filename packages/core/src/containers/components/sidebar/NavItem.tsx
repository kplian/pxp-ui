/* eslint-disable react/require-default-props */
/**
 * Menu Item
 * @copyright Kplian Ltda 2020
 * @uthor Israel Colque
 */
import React, { forwardRef, FC } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Button, Collapse, ListItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Icon from '@mui/material/Icon';
import PagesContext from '../../../context/PagesContext';

const useStyles: any = makeStyles((theme: any) => ({
  item: {
    display: 'block !important',
    paddingTop: 0,
    paddingBottom: 0,
  },
  itemLeaf: {
    display: 'grid !important',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: theme.palette.text.secondary + ' !important',
    padding: '10px 8px !important',
    justifyContent: 'flex-start  !important',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium,
  },
  buttonLeaf: {
    color: theme.palette.text.secondary + ' !important',
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightRegular,
    '&.depth-0': {
      '& $title': {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),
    fontFamily: 'Material Icons Outlined',
  },
  title: {
    marginRight: 'auto',
  },
  active: {
    color: theme.palette.secondary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium,
    },
    '& $icon': {
      color: theme.palette.secondary.main,
    },
  },
}));

const CustomRouterLink = forwardRef((props: any, ref: any) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

const NavItem: FC<any> = ({
  title,
  icon,
  href,
  open: openProp,
  depth,
  children,
  className,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(openProp);
  const { icons: iconsPxp } = React.useContext(PagesContext);

  const handleOpen = () => {
    setOpen(!open);
  };

  let paddingLeft = 8;
  if (depth > 0) {
    paddingLeft = 24 + 16 * depth;
  }

  const style = { paddingLeft };

  const getIcon = () => {
    const IconPxp = iconsPxp[icon] ? iconsPxp[icon] : null;
    return (
      <>
        {icon && IconPxp ? (
          <div className={classes.icon}>
            <IconPxp />
          </div>
        ) : (
          <Icon className={classes.icon}>{icon}</Icon>
        )}
      </>
    );
  };

  if (children) {
    return (
      <ListItem
        className={clsx(classes.item, className)}
        disableGutters
        key={title}
        {...rest}
      >
        <Button className={classes.button} onClick={handleOpen} sx={style}>
          {icon && getIcon()}
          <span className={classes.title}>{title}</span>
          {open ? (
            <ExpandLessIcon fontSize="small" color="inherit" />
          ) : (
            <ExpandMoreIcon fontSize="small" color="inherit" />
          )}
        </Button>
        <Collapse in={open}>{children}</Collapse>
      </ListItem>
    );
  }
  // activeClassName={classes.active} button props
  return (
    <ListItem
      className={clsx(classes.itemLeaf, className)}
      disableGutters
      key={title}
      {...rest}
    >
      <Button
        className={clsx(classes.buttonLeaf, `depth-${depth}`)}
        component={CustomRouterLink}
        exact
        style={style}
        to={href}
      >
        {icon && getIcon()}
        {title}
      </Button>
    </ListItem>
  );
};

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.any,
  href: PropTypes.string,
  depth: PropTypes.number.isRequired,
  open: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

NavItem.defaultProps = {
  open: false,
};

export default NavItem;
