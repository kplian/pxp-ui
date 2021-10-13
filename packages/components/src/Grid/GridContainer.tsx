/**
 * GridContainer
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';

// @mui/material components
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

const styles = {
  grid: {
    marginRight: '-15px',
    marginLeft: '-15px',
    width: 'auto',
  },
};

const useStyles: any = makeStyles(styles);

export default function GridContainer(props) {
  const { children, className, ...rest } = props;
  const classes = useStyles();
  return (
    <Grid container {...rest} className={`${classes.grid} ${className}`}>
      {children}
    </Grid>
  );
}

GridContainer.defaultProps = {
  className: '',
};

GridContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
