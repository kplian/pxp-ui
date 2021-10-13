/**
 * This dialog allows password recovery functionality
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 * */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { FormHelperText } from '@mui/material';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import Form from '@pxp-ui/components/Form/Form';
import LoadingScreen from '@pxp-ui/components/LoadingScreen';
import { startResetPassword } from '../../actions/auth';
import Pxp from '../../Pxp';

const Forgot = () => {
  const [error, setError] = React.useState('');
  const dispatch: any = useDispatch();
  const [loadingScreen, setLoadingScreen] = useState(false);
  const history = useHistory();
  const { t } = useTranslation();

  const handleForgot = (login, captcha, states) => {
    dispatch(startResetPassword({ login, captcha })).then((errorMsg) => {
      setLoadingScreen(false);
      if (errorMsg !== 'success') {
        setError(errorMsg);
        states.captcha.reset();
      } else {
        history.push('/forgot/confirm');
      }
    });
  };
  const forgotForm = {
    columns: {
      username: {
        type: 'TextField',
        label: t('username_or_email'),
        autoFocus: true,
        gridForm: { xs: 12, sm: 12 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required(t('username_or_email_required')),
        },
      },
      captcha: {
        type: 'GoogleReCaptcha',
        sitekey: Pxp.config.recaptchaKey,
      },
    },
    resetButton: false,
    submitLabel: t('send_reset_email'), // this is optional
    onEnterSubmit: true,
    onSubmit: ({ values, states }) => {
      setLoadingScreen(true);
      handleForgot(values.username, values.captcha, states);
    },
  };
  const handleClose = () => {};
  return (
    <>
      <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="forgot-dialog-title">
          <Typography variant="h3">{t('reset_your_password')}</Typography>
        </DialogTitle>
        <DialogContent>
          <Form data={forgotForm} dialog loading={loadingScreen} />
          {error && <FormHelperText error>{error}</FormHelperText>}
          <Typography variant="body2">{t('dont_reset_password')}</Typography>
          <Link href="/login"> {t('login')}</Link>
        </DialogContent>
      </Dialog>
      {
        // loadingScreen && <LoadingScreen />
      }
    </>
  );
};
export default Forgot;
