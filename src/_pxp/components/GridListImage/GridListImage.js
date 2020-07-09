import React from 'react';
import useJsonStore from '../../hooks/useJsonStore';
import DrawGridListImage from './DrawGridListImage';
import LoadingScreen from "../LoadingScreen";

const GridListImage = ({ idTypeFile, idTable, isAdmin }) => {
  const getData = {
    url: 'parametros/Archivo/getFiles',
    params: {
      start: '0',
      limit: '50',
      sort: 'a.id_archivo',
      dir: 'ASC', // for seeing every time the last save
      id_tipo_archivo: idTypeFile,
      id_tabla: idTable,
    },
  };

  // get the menu that we will use in the table cell for each one.
  const jsonStore = useJsonStore(getData);
  const { state, set, data, loading } = jsonStore;

  const refresData = () => {
    set({
      ...state,
      refresh: true,
    });
  };
  return (
    <>
      {data && (
        <DrawGridListImage
          state={state}
          set={set}
          data={data}
          loading={loading}
          isAdmin={isAdmin}
          refresData={refresData}
        />
      )}
      {loading && <LoadingScreen />}
    </>
  );
};

export default GridListImage;
