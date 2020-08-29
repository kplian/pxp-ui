/**
 * ComponentMapping.js (this component will be use for example for component shop or all that you want to render with map())
 * @copyright Disydes 2020
 * @author Favio Figueroa
 */

import React, { forwardRef, useImperativeHandle } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import useJsonStore from '../../hooks/useJsonStore';
import DrawComponents from './DrawComponents';
import SkeletonFuncionario from '../../../boa-manager-file/components/SkeletonFuncionario';
import DrawSkeleton from './DrawSkeleton';

const ComponentMapping = forwardRef(({ config }, ref) => {
  const { getDataTable } = config;
  const useJsonStoreRes = useJsonStore(getDataTable);
  const { data, state, set, loading } = useJsonStoreRes;

  const limitArray = Array.apply(null, { length: parseInt(config.getDataTable.params.limit, 10) / 2 });


  /* const [itemStates, setItemStates] = useState(); // not use for moment
  useEffect(() => {
    if (data && data.datos.length > 0) {
      // create state for each data
      let aux = {};
      data.datos.forEach((row) => {
        aux = {
          ...aux,
          [row[config.idStore]]: row,
        };
      });
      setItemStates(aux);
    }
  }, [data]); */

  useImperativeHandle(ref, () => {
    return {
      useJsonStoreRes,
    };
  });

  return (
    <>
      <Grid container spacing={3} key={`group_${1}`}>
        {data && (
          <DrawComponents config={config} useJsonStoreRes={useJsonStoreRes} />
        )}
        {loading && (
          <DrawSkeleton
            grid={config.grid}
            limitArray={limitArray}
            config={config}
          />
        )}
      </Grid>
    </>
  );
});

export default ComponentMapping;
