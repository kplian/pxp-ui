/**
 * Item.js
 * @copyright Kplian 2020
 * @author Favio Figueroa
 */

import React, { forwardRef } from 'react';
import Grid from '@material-ui/core/Grid';

const areEqual = (prev, next) => {
  console.log('next.dataChanged',next.dataChanged)
  console.log('key areEqual', next.dataChanged.includes(next.keyId));
  return (
    prev.keyId === next.keyId && next.dataChanged.includes(next.keyId) === false
  );
};

export const ItemComponent = forwardRef(
  ({ grid, keyId, dataChanged = [], children }, ref) => {
    console.log(keyId);
    return (
      <Grid key={keyId} item {...grid} ref={ref}>
        {children}
      </Grid>
    );
  },
);

/**
 * A memoized component that will re-render only one of props described in areEqual change.
 */
// const Item = React.memo((props) => <ItemComponent {...props} />, areEqual);
const Item = React.memo(
  forwardRef((props, ref) => <ItemComponent {...props} ref={ref} />),
  areEqual,
);

export default Item;
