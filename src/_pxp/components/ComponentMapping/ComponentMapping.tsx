/**
 * ComponentMapping.js (this component will be use for example for component shop or all that you want to render with map())
 * @copyright Kplian 2020
 * @author Favio Figueroa
 */

import React, { forwardRef, useImperativeHandle, FC } from 'react';
import Grid from '@material-ui/core/Grid';
import useJsonStore from '../../hooks/useJsonStore';
import DrawComponents from './DrawComponents';
import DrawSkeleton from './DrawSkeleton';

interface MappingInterface {
  config: any;
  dataChanged?: any[];
}

const ComponentMapping: FC<MappingInterface> = forwardRef(({ config, dataChanged = [] }, ref) => {
  const { getDataTable, spacing = 3 } = config;
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
  const handleRefresh = () => {
    set({
      ...state,
      refresh: true,
    });
  };

  useImperativeHandle(ref, () => {
    return {
      useJsonStoreRes,
      handleRefresh,
    };
  });

  return (
    <>
      <Grid container spacing={spacing} key={`group_${1}`}>
        {data && (
          <DrawComponents config={config} useJsonStoreRes={useJsonStoreRes} dataChanged={dataChanged}/>
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
