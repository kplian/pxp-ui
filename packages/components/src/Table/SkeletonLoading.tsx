/**
 * Component Skeleton for loading the table pxp
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */

import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';

const areEqual = (prev, next) =>
  prev.statesShowColumn === next.statesShowColumn;

const SkeletonLoadingComponent = ({ columns, statesShowColumn }) => {
  return (
    <TableBody>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((row, index) => {
        // todo
        return (
          <TableRow key={`tableRow_${index}`}>
            {statesShowColumn.checkbox_ && (
              <TableCell>
                <Skeleton
                  animation="wave"
                  height={10}
                  width="80%"
                  style={{ marginBottom: 6 }}
                />
                <Skeleton animation="wave" height={10} width="40%" />
              </TableCell>
            )}
            {Object.entries(columns).map(([nameKey], indexColumn) => {
              return (
                <React.Fragment key={`cell_${indexColumn}_${nameKey}`}>
                  {statesShowColumn[nameKey] && (
                    <TableCell align="left">
                      <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                      />
                      <Skeleton animation="wave" height={10} width="40%" />
                    </TableCell>
                  )}
                </React.Fragment>
              );
            })}
            <TableCell align="right">
              <Skeleton variant="circular" width={40} height={40} />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

/**
 * A memoized component that will re-render only one of props described in areEqual change.
 */
const SkeletonLoading = React.memo(
  (props: any) => <SkeletonLoadingComponent {...props} />,
  areEqual,
);

export default SkeletonLoading;
