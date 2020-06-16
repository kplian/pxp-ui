import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Rating from '@material-ui/lab/Rating';
import clsx from 'clsx';

const useStylesRating = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  iconFilled: {

  },
  iconEmpty: {
    color: 'white'
  },
}));

const ItemRating = ({ rating, className }) => {
  return (
    <Rating
        className={ clsx(className) }
        name="rating"
        value={ parseInt(rating) || 0 }
        classes={useStylesRating()}
        precision={0.5}
        size="small"
        readOnly
      />
  )
};

export default ItemRating;