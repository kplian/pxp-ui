import React from 'react';
import { Typography } from '@material-ui/core';

const ItemDescription = ( {description} ) => {
  return (
    <Typography variant="body2" color="textSecondary" component="p">
      { description }
    </Typography>
  )
};



export default ItemDescription;