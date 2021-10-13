/**
 * DrawComponents.js
 * @copyright Kplian 2020
 * @author Favio Figueroa
 */

import React, { useCallback, useRef, FC } from 'react';
import Item from './Item';

const DrawComponents: FC<any> = ({ config, useJsonStoreRes, dataChanged = [] }) => {
  const { grid } = config;
  const { data, state, set, loading } = useJsonStoreRes;
  const { dataRows } = config.dataReader; // this is the object that has the data for rendering

  const observer: any = useRef();
  const lastComponentRender = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data[dataRows].length < data.total) {
          // jsonStore.set(prev => ({...prev, params:{ ...prev.params, start: parseInt(prev.params.start + 10)}, infinite:true}))
          set({
            ...state,
            params: {
              ...state.params,
              start: 
                parseInt(state.params.start, 10) +
                  parseInt(state.params.limit, 10),
            },
            infinite: true,
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, config, data, useJsonStoreRes, state],
  );

  return (
    <>
      {data[dataRows].map((row, index) => {
        return (
          <Item
            key={`${row[config.idStore]}`}
            grid={grid}
            keyId={row[config.idStore]}
            {...(parseInt(data[dataRows].length, 10) === index + 1 && {
              ref: lastComponentRender,
            })}
            dataChanged={dataChanged}
            // memoDisabled
          >
            {config.renderComponent(row, null)}
          </Item>
        );
      })}
    </>
  );
};

export default DrawComponents;
