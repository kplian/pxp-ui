import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {
  AppBar,
  IconButton,
  Typography,
  Slide,
  Toolbar,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import Form from '../../../components/Form/Form';;

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  appBar: {
    position: 'relative',
  },
}));

const ModalForm = ({ isEdit = false, schema, values = {}, open = false, handleClose }) => {
  const classes = useStyles();
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



  const setValues = (schema, values) => {
    Object.keys(schema.columns).forEach(key => {
      schema.columns[key].initialValue = values[key] || '';
    })
  }

  console.log('schema.onSubmit',schema.onSubmit);

  if (isEdit) {
    setValues(schema, values);
  }
 
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {isEdit ? 'Editar' : 'Agregar'}
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Form dialog data={schema} />
      </DialogContent>
    </Dialog>
  );
};

export default ModalForm;
