/* eslint-disable radix */
import React from 'react';
import { makeStyles } from '@mui/styles';
import Rating from '@mui/material/Rating';
import clsx from 'clsx';
import { Theme } from '@mui/material';

const useStylesRating = makeStyles((theme:Theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  iconFilled: {},
  iconEmpty: {
    color: 'white',
  },
}));

const ItemRating = ({ rating, className }) => {
  return (
    <Rating
      className={clsx(className)}
      name="rating"
      value={parseInt(rating) || 0}
      classes={useStylesRating()}
      precision={0.5}
      size="small"
      readOnly
    />
  );
};

export default ItemRating;
