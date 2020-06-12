/**
 * This dialog allows password recovery functionality
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 * */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { FormHelperText } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Form from '../../components/Form/Form';
import LoadingScreen from '../../components/LoadingScreen';
import { startResetPassword } from '../../actions/auth';
import Pxp from '../../../Pxp';

const Forgot = () => {
  const [error, setError] = React.useState('');
  const dispatch = useDispatch();
  const [loadingScreen, setLoadingScreen] = useState(false);
  const history = useHistory();

  const handleForgot = (login, captcha) => {
    dispatch(startResetPassword({ login, captcha })).then((errorMsg) => {
      setLoadingScreen(false);
      if (errorMsg !== 'success') {
        setError(errorMsg);
      } else {
        history.push('/forgot/confirm');
      }
    });
  };
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
      captcha: {
        type: 'GoogleReCaptcha',
        sitekey: Pxp.config.recaptchaKey,
      },
    },
    resetButton: false,
    submitLabel: 'Send Reset Email', // this is optional
    onEnterSubmit: true,
    onSubmit: ({ values }) => {
      setLoadingScreen(true);
      handleForgot(values.username, values.captcha);
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
          <Form data={forgotForm} dialog />
          {error && <FormHelperText error>{error}</FormHelperText>}
          <Typography variant="body2">
            Don&apos;t want to reset your password?
          </Typography>
          <Link href="/login"> Login</Link>
        </DialogContent>
      </Dialog>
      {loadingScreen && <LoadingScreen />}
    </>
  );
};
export default Forgot;
