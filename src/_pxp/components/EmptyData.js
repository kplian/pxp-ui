import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  empty: {
    textAlign: 'center',
    width: '100%',
    height: '100%',
    marginTop: '50%',
    fontSize: '0.9rem',
    color: theme.palette.text.primary,
  },
}));

const EmptyData = () => {
  const classes = useStyles();
  return (
    <p className={classes.empty}>
      No hay <b>datos</b> para mostrar
    </p>
  );
};

export default EmptyData;
