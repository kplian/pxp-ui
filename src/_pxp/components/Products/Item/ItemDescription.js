import React from 'react';
import { Typography } from '@material-ui/core';

import makeStyles from '@material-ui/core/styles/makeStyles';
import styles from '../../../../_assets/jss/ellipsisText';

const useStyles = makeStyles(styles);

const ItemDescription = ({ description }) => {
  const classes = useStyles();
  return (
    <Typography
      className={classes.clamp3}
      variant="body2"
      color="textSecondary"
      component="p"
    >
      {description}
    </Typography>
  );
};

export default ItemDescription;
