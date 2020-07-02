/**
 * Component for toolbar chat
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */
import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from 'react-router-dom';

import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  makeStyles,
  SvgIcon,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: 64,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  onlineIndicator: {
    marginRight: theme.spacing(1),
  },
  searchInput: {
    marginLeft: theme.spacing(2),
    flexGrow: 1,
  },
}));

const Toolbar = ({ className, rest, contact }) => {
  const classes = useStyles();
  const history = useHistory();
  const moreRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <IconButton
        className={classes.menuButton}
        onClick={() => history.goBack()}
      >
        <SvgIcon fontSize="small">
          <ArrowBackIosIcon />
        </SvgIcon>
      </IconButton>
      {contact && (
        <Box display="flex" alignItems="center">
          <Avatar src={contact.avatar} />
          <Box ml={1}>
            <Typography variant="h6" color="textPrimary">
              {contact.name}
            </Typography>
            <Box display="flex" alignItems="center">
              {contact.desc}
            </Box>
            <Box display="flex" alignItems="center">
              {contact.state}
            </Box>
          </Box>
        </Box>
      )}
      <Box flexGrow={1} />
      <Tooltip title="More options">
        <IconButton onClick={handleMenuOpen} ref={moreRef}>
          <SvgIcon fontSize="small">
            <MoreVertIcon />
          </SvgIcon>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={moreRef.current}
        keepMounted
        elevation={1}
        onClose={handleMenuClose}
        open={openMenu}
      >
        <MenuItem>
          <ListItemIcon>
            <SvgIcon fontSize="small">
              <MoreVertIcon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary="Button" />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Toolbar;
