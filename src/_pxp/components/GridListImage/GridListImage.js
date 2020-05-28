import React from 'react';
import useJsonStore from '../../hooks/useJsonStore';
import DrawGridListImage from './DrawGridListImage';

const GridListImage = ({ dataConfig }) => {
  const dataConfig2 = {
    getData: {
      url: 'parametros/Archivo/getFiles',
      params: {
        start: '0',
        limit: '50',
        sort: 'a.id_archivo',
        dir: 'ASC', // for seeing every time the last save
        id_tipo_archivo: 1,
        id_tabla: 1,
      },
    },
  };

  // get the menu that we will use in the table cell for each one.
  const jsonStore = useJsonStore(dataConfig2.getData);
  const { state, set, data, loading } = jsonStore;

  return (
    <>
      {data && (
        <DrawGridListImage
          state={state}
          set={set}
          data={data}
          loading={loading}
        />
      )}
    </>
  );
};

export default GridListImage;
