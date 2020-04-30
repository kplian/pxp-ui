import React, {useRef, useState} from 'react';
import {
  Badge,
  Box, Button,
  FormControlLabel,
  IconButton, makeStyles,
  Popover,
  SvgIcon,
  Switch, TextField,
  Tooltip,
  Typography
} from "@material-ui/core";

const THEMES = {
  LIGHT: 'LIGHT',
  ONE_DARK: 'ONE_DARK',
  KPLIAN: 'KPLIAN'
};

const useStyles = makeStyles((theme) => ({
  badge: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginTop: 10,
    marginRight: 5
  },
  popover: {
    width: 320,
    padding: theme.spacing(2)
  }
}));

const TolPop = ({children, icon}) => {

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
          <IconButton
            color="inherit"
            onClick={handleOpen}
            ref={ref}
          >
            <SvgIcon fontSize="small">
              {icon}
            </SvgIcon>
          </IconButton>
      </Tooltip>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        classes={{paper: classes.popover}}
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
