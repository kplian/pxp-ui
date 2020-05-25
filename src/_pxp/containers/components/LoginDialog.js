/**
 * Login dialog will be called from login page and also when session expires
 * @copyright Kplian Ltda 2020
 * @uthor Israel Colque
 */
import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { useSelector, useDispatch } from 'react-redux';
import { FormHelperText } from '@material-ui/core';

import * as Yup from 'yup';
import config from '../../../config';
import Form from '../../components/Form/Form';
import LoadingScreen from '../../components/LoadingScreen';
import { startLogin } from '../../actions/auth';

export default ({ open: popen, username }) => {
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [open] = React.useState(popen);
  const [error, setError] = React.useState('');
  const sessionDied = useSelector((state) => state.auth.sessionDied);
  const dispatch = useDispatch();

  const handleLogin = (login, password) => {
    dispatch(startLogin({ login, password })).then((errorMsg) => {
      if (errorMsg !== 'success') {
        setError(errorMsg);
        setLoadingScreen(false);
      }
    });
  };

  useEffect(() => {
    if (!sessionDied) {
      setLoadingScreen(false);
    }
  }, [sessionDied, loadingScreen]);

  const handleClose = () => { };

  const userForm = {
    columns: {
      username: {
        type: 'TextField',
        label: 'Username',
        autoFocus: true,
        initialValue: username || '',
        disabled: !!username,
        gridForm: { xs: 12, sm: 12 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Username is Required'),
        },
      },
      password: {
        type: 'TextField',
        typeTextField: 'password',
        label: 'Password',
        initialValue: '',
        gridForm: { xs: 12, sm: 12 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Password is Required'),
        },
      },
    },
    resetButton: true,
    submitLabel: 'Login', // this is optional
    onSubmit: ({ values }) => {
      setLoadingScreen(true);
      handleLogin(values.username, values.password);
    },
  };

  return (
    <>
      <Dialog
        open={open || sessionDied}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Sign in {config.applicationName}
        </DialogTitle>
        <DialogContent>
          <Form data={userForm} dialog />
          {error && <FormHelperText error>{error}</FormHelperText>}
        </DialogContent>
      </Dialog>
      {loadingScreen && <LoadingScreen />}
    </>
  );
};
