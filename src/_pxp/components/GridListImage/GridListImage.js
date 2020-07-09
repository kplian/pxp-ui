import React from 'react';
import useJsonStore from '../../hooks/useJsonStore';
import DrawGridListImage from './DrawGridListImage';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  empty: {
    textAlign: 'center',
    width: '100%',
    height: '100%',
    marginTop: '50%',
    fontSize: '0.9rem',
    color: theme.palette.text.primary,
  }
}));

const GridListImage = ({ idTypeFile, idTable }) => {
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
  const jsonStore = useJsonStore(getData);
  const { state, set, data = {}, loading } = jsonStore;
  console.log(data)
  return (
    <>
      {data && data.total !== '0' && (
        <DrawGridListImage
          state={state}
          set={set}
          data={data}
          loading={loading}
        />
      )}
      {
        ((data && data.total === '0') && !loading) &&
        <p className={classes.empty}>No hay imagenes para mostrar</p>
      }
    </>
  );
};

export default GridListImage;
