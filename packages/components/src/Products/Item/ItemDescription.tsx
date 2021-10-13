import React from 'react';
import { Typography } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';
import styles from '../../styles/ellipsisText';

const useStyles: any = makeStyles(styles);

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
