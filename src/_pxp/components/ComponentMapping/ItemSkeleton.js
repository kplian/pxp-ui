/**
 * ItemSkeleton.js
 * @copyright Disydes 2020
 * @author Favio Figueroa
 */

import React from 'react';
import Grid from '@material-ui/core/Grid';

const areEqual = (prev, next) => {
  return prev.keyId === next.keyId;
};

export const ItemSkeletonComponent = ({ keyId, grid, children }) => {
  return (
    <Grid key={keyId} item {...grid}>
      {children}
    </Grid>
  );
};

/**
 * A memoized component that will re-render only one of props described in areEqual change.
 * NOTE: in this case never use memo becuase the skeleton hide or show while the loading is true o false
 */
const ItemSkeleton = React.memo(
  (props) => <ItemSkeletonComponent {...props} />,
  areEqual,
);

export default ItemSkeleton;
