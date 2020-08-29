/**
 * DrawSkeleton.js
 * @copyright Disydes 2020
 * @author Favio Figueroa
 */
import React from 'react';
import ItemSkeleton from './ItemSkeleton';

const DrawSkeleton = ({ limitArray, grid, config }) => {
  return (
    <>
      {limitArray.map((row, index) => {
        return (
          <ItemSkeleton
            key={`skeleton_${index}`}
            keyId={`skeleton_${index}`}
            grid={grid}
          >
            {config.renderSkeleton()}
          </ItemSkeleton>
        );
      })}
    </>
  );
};

export default DrawSkeleton;
