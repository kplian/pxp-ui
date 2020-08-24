/**
 * ComponentMapping.js (this component will be use for example for component shop or all that you want to render with map())
 * @copyright Disydes 2020
 * @author Favio Figueroa
 */

import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import useJsonStore from '../../hooks/useJsonStore';
import DrawComponents from './DrawComponents';

const ComponentMapping = ({ config }) => {
  const { getDataTable } = config;
  const useJsonStoreRes = useJsonStore(getDataTable);
  const { data, state, set, loading } = useJsonStoreRes;

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

  return (
    <>
      {data && (
        <DrawComponents
          config={config}
          useJsonStoreRes={useJsonStoreRes}
        />
      )}
      {loading && (
        <>
          <Skeleton
            animation="wave"
            height={10}
            width="100%"
            style={{ marginBottom: 6 }}
          />
          <Skeleton variant="rect" width="100%" height={118} />
          <Box pt={0.5}>
            <Skeleton />
            <Skeleton width="100%" />
          </Box>
        </>
      )}
    </>
  );
};

export default ComponentMapping;
