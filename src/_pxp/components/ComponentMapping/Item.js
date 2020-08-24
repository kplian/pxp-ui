/**
 * Item.js
 * @copyright Disydes 2020
 * @author Favio Figueroa
 */

import React, { forwardRef } from 'react';
import Grid from '@material-ui/core/Grid';

const areEqual = (prev, next) => {
  return prev.keyId === next.keyId;
};

export const ItemComponent = forwardRef(({ grid, keyId, children }, ref) => {
  return (
    <Grid key={keyId} item {...grid} ref={ref}>
      {children}
    </Grid>
  );
});

/**
 * A memoized component that will re-render only one of props described in areEqual change.
 */
// const Item = React.memo((props) => <ItemComponent {...props} />, areEqual);
const Item = React.memo(
  forwardRef((props, ref) => <ItemComponent {...props} ref={ref} />),
  areEqual,
);

export default Item;
