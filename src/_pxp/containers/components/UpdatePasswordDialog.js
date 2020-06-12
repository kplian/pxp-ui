/**
 * This dialog shows a form to update password after password recovery was requested
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 * */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { FormHelperText } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import Form from '../../components/Form/Form';
import LoadingScreen from '../../components/LoadingScreen';
import { startUpdatePassword } from '../../actions/auth';

const UpdatePassword = () => {
  const [error, setError] = React.useState('');
  const dispatch = useDispatch();
  const [loadingScreen, setLoadingScreen] = useState(false);
  const history = useHistory();
  const params = useParams();

  const handleUpdate = (password1, token) => {
    dispatch(startUpdatePassword({ password1, token })).then((errorMsg) => {
      setLoadingScreen(false);
      if (errorMsg !== 'success') {
        setError(errorMsg);
      } else {
        history.push('/login');
      }
    });
  };
  const updateForm = {
    columns: {
      password1: {
        type: 'TextField',
        typeTextField: 'password',
        label: 'New Password',
        autoFocus: true,
        gridForm: { xs: 12, sm: 12 },
        variant: 'outlined',
        validate: {
          shape: Yup.string()
            .required('New password is Required')
            .min(8, 'Password should be at least 8 characters')
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
              'Password should include at least 2 letters (one upper and one lower case) and at least 1 number',
            ),
        },
      },
      password2: {
        type: 'TextField',
        typeTextField: 'password',
        label: 'Re-type Password',
        gridForm: { xs: 12, sm: 12 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Re-type password is Required'),
        },
      },
    },
    resetButton: false,
    submitLabel: 'Update Password', // this is optional
    onEnterSubmit: true,
    onSubmit: ({ values }) => {
      if (values.password1 !== values.password2) {
        setError('Passwords do not match');
      } else {
        setLoadingScreen(true);
        handleUpdate(values.password1, params.token);
      }
    },
  };
  const handleClose = () => {};
  return (
    <>
      <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle disableTypography id="forgot-dialog-title">
          <Typography variant="h3">Reset your Password</Typography>
        </DialogTitle>
        <DialogContent>
          {!!params.token && (
            <>
              <Typography gutterBottom>
                Your password must contain the following:
              </Typography>
              <Typography gutterBottom>
                1. At least 8 characters (a strong password has at least 14
                characters)
              </Typography>
              <Typography gutterBottom>
                2. At least 2 letters (one upper and one lower case) and at
                least 1 number
              </Typography>
              <br />
              <Form data={updateForm} dialog />
              {error && (
                <FormHelperText error>
                  <Typography variant="h5">{error}</Typography>
                </FormHelperText>
              )}
            </>
          )}
          {!params.token && (
            <Typography variant="h4">
              No token was provided to reset password!!!
            </Typography>
          )}
        </DialogContent>
      </Dialog>
      {loadingScreen && <LoadingScreen />}
    </>
  );
};
export default UpdatePassword;
