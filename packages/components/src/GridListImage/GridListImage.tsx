/**
 * GridListImage for view images in grid
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import React from 'react';
import { useJsonStore } from '@pxp-ui/hooks';
import DrawGridListImage from './DrawGridListImage';
import { makeStyles } from '@mui/styles';
import LoadingScreen from '../LoadingScreen';
import { Theme } from '@mui/material';
import { Pxp } from '@pxp-ui/core';

const useStyles: any = makeStyles((theme: Theme) => ({
  empty: {
    textAlign: 'center',
    width: '100%',
    height: '100%',
    marginTop: '50%',
    fontSize: '0.9rem',
    color: theme.palette.text.primary,
  }
}));

const GridListImage = ({ idTypeFile, idTable, isAdmin }) => {
  const classes = useStyles();
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
  const jsonStore: any = useJsonStore(getData, Pxp);
  const { state, set, data = {}, loading } = jsonStore;

  const refresData = () => {
    set({
      ...state,
      refresh: true,
    });
  };
  return (
    <>
      {data && data.total !== '0' && (
        <DrawGridListImage
          state={state}
          set={set}
          data={data}
          loading={loading}
          isAdmin={isAdmin}
          refresData={refresData}
        />
      )}
      {
        ((data && data.total === '0') && !loading) &&
        <p className={classes.empty}>No hay imagenes para mostrar</p>
      }
      {loading && <LoadingScreen />}
    </>
  );
};

export default GridListImage;
