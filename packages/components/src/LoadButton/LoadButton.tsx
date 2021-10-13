import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles: any = makeStyles((theme:Theme) => ({
  progress: {
    position: 'absolute',
  },
}));

const LoadButton = ({
  children,
  loading = false,
  component = null,
  disabled = false,
  ...props
}) => {
  const classes = useStyles();
  const Element = component || Button;
  return (
    <Element {...props} disabled={disabled || loading}>
      {children}
      {loading && (
        <CircularProgress
          color={props.color}
          className={classes.progress}
          size={28}
        />
      )}
    </Element>
  );
};

export default LoadButton;
