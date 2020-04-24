import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import config from '../../../config';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { startLogin } from '../../actions/auth';
import { useSelector, useDispatch } from 'react-redux';
import { FormHelperText } from '@material-ui/core';
import { Icon } from '@material-ui/core';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import * as Yup from "yup";
import Form from "../../components/Form/Form";
import LoadingScreen from "../../components/LoadingScreen";

export default (props) => {

  const [loadingScreen, setLoadingScreen] = useState(false);
  const [open] = React.useState(props.open);
  const [error, setError] = React.useState('');
  const sessionDied = useSelector(state => state.auth.sessionDied);
  const dispatch = useDispatch();

  const userForm = {
    columns: {
      username: {
        type: 'TextField',
        label: 'Username',
        autoFocus: true,
        initialValue: props.login || '',
        gridForm: {xs: 12, sm: 12},
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Username is Required')
        }
      },
      password: {
        type: 'TextField',
        typeTextField: 'password',
        label: 'Password',
        initialValue: '',
        gridForm: {xs: 12, sm: 12},
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Password is Required')
        }
      }
    },
    resetButton: true,
    submitLabel: 'Login', // this is optional
    onSubmit: ({ values }) => {
      setLoadingScreen(true);
      handleLogin(values.username, values.password);
    }
  };


  const handleLogin = (login, password) => {
    dispatch(startLogin({ login, password })).then((error) => {
      console.log('dialog', error);
      if (error !== 'success') {
        setError(error);
        setLoadingScreen(false);
      }
    });
  };

  const handleClose = () => {

  }

  return (
    <>
      <Dialog open={open || sessionDied} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Sign in {config.applicationName}
        </DialogTitle>
        <DialogContent>
          <Form data={userForm} dialog={true}/>
          {error && <FormHelperText error>{error}</FormHelperText>}
        </DialogContent>
      </Dialog>
      { loadingScreen && <LoadingScreen /> }
    </>

  );
}
