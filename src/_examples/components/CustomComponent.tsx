import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ExamplePicker from './form/ExamplePicker';
import BasicContainer from '../../_pxp/containers/BasicContainer';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '10px',
    backgroundColor: theme.palette.primary.main,
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <BasicContainer>
      {' '}
      Custom1
      <h1>prueba</h1>
      <Button variant="contained" className={classes.button}>
        Go to documentation
      </Button>
      <ExamplePicker />
    </BasicContainer>
  );
};
