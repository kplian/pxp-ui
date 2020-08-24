/**
 * DrawComponents.js
 * @copyright Disydes 2020
 * @author Favio Figueroa
 */

import React, { useCallback, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Item from './Item';

const DrawComponents = ({ config, useJsonStoreRes }) => {
  const { grid } = config;
  const { data, state, set, loading } = useJsonStoreRes;
  const observer = useRef();
  const lastComponentRender = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data.datos.length < data.total) {
          // jsonStore.set(prev => ({...prev, params:{ ...prev.params, start: parseInt(prev.params.start + 10)}, infinite:true}))
          set({
            ...state,
            params: {
              ...state.params,
              start: parseInt(
                parseInt(state.params.start, 10) +
                  parseInt(state.params.limit, 10),
                10,
              ),
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
      <Grid container spacing={3} key={`group_${1}`}>
        {data.datos.map((row, index) => {
          return (
            <Item
              key={`${row[config.idStore]}`}
              grid={grid}
              keyId={row[config.idStore]}
              {...(parseInt(data.datos.length, 10) === index + 1 && {
                ref: lastComponentRender,
              })}
              // memoDisabled
            >
              {config.renderComponent(row, null)}
            </Item>
          );
        })}
      </Grid>
    </>
  );
};

export default DrawComponents;
