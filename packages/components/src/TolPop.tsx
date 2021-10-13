/**
 * TolTop Component, integrate tooltip al popover
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import React, { useRef, useState } from 'react';
import {
  IconButton,
  Popover,
  SvgIcon,
  Tooltip,
} from '@mui/material';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles: any = makeStyles((theme:Theme) => ({
  badge: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginTop: 10,
    marginRight: 5,
  },
  popover: {
    width: 320,
    padding: theme.spacing(2),
  },
}));

const TolPop = ({ children, icon }) => {
  const classes = useStyles();
  const ref = useRef(null);

  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Settings">
        <IconButton color="inherit" onClick={handleOpen} ref={ref}>
          <SvgIcon fontSize="small">{icon}</SvgIcon>
        </IconButton>
      </Tooltip>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        classes={{ paper: classes.popover }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
      >
        {children}
      </Popover>
    </>
  );
};

export default TolPop;
