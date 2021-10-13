/**
 * GridItem
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @mui/material components
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

const styles: any = {
  grid: {
    position: 'relative',
    width: '100%',
    minHeight: '1px',
    paddingRight: '15px',
    paddingLeft: '15px',
    /* flexBasis: "auto" */
  },
};

const useStyles: any = makeStyles(styles);

export default function GridItem(props) {
  const { children, className, ...rest } = props;
  const classes = useStyles();
  return (
    <Grid item {...rest} className={`${classes.grid} ${className}`}>
      {children}
    </Grid>
  );
}

GridItem.defaultProps = {
  className: '',
};

GridItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
