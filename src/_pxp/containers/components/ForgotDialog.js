import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { FormHelperText } from '@material-ui/core';
import * as Yup from 'yup';
import Form from '../../components/Form/Form';
import LoadingScreen from '../../components/LoadingScreen';

const Forgot = () => {
  const [error, setError] = React.useState('');
  // const dispatch = useDispatch();
  const [loadingScreen, setLoadingScreen] = useState(false);

  const forgotForm = {
    columns: {
      username: {
        type: 'TextField',
        label: 'Username or Email',
        autoFocus: true,
        gridForm: { xs: 12, sm: 12 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Username  or Email is Required'),
        },
      },
    },
    resetButton: false,
    submitLabel: 'Send Reset Email', // this is optional
    onEnterSubmit: true,
    onSubmit: ({ values }) => {
      setLoadingScreen(true);
      // handleLogin(values.username, values.password);
    },
  };
  const handleClose = () => {};
  return (
    <>
      <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="forgot-dialog-title">
          <Typography variant="h3">Reset your Password</Typography>
        </DialogTitle>
        <DialogContent>
          <Form data={forgotForm} dialog />
          {error && <FormHelperText error>{error}</FormHelperText>}
          <Typography variant="body2" component="body2">
            Don&apos;t want to reset your password?
          </Typography>
          <br />
          <Link href="/login"> Login</Link>
        </DialogContent>
      </Dialog>
      {loadingScreen && <LoadingScreen />}
    </>
  );
};
export default Forgot;
