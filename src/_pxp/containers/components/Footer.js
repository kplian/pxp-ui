import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Footer = (props) => {
  
  const classes = useStyles();

  return (
    <div
      {...props}
      className={classes.root}
    >
      <Typography variant="body1">
        &copy;{' '}
        <Link
          component="a"
          href="http://kplian.com/"
          target="_blank"
        >
          Kplian Ltda.
        </Link>
        . 2020
      </Typography>
      <Typography variant="caption">
        Open Source Frontend Framework for Agile development
        of React Applications
      </Typography>
    </div>
  );
};
export default Footer;