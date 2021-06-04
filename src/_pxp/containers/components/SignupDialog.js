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
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Form from '../../components/Form/Form';
import LoadingScreen from '../../components/LoadingScreen';
import { startSignup } from '../../actions/auth';
import Pxp from '../../../Pxp';

const useStyles = makeStyles((theme) => ({
  login: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
  error: {
    fontSize: '1rem',
    color: red[500],
  },
}));

const SignUpDialog = () => {
  const classes = useStyles();
  const [error, setError] = React.useState('');
  const dispatch = useDispatch();
  const [loadingScreen, setLoadingScreen] = useState(false);
  const history = useHistory();
  const { t } = useTranslation();

  const handleSignup = (
    email,
    name,
    surname,
    username,
    password,
    captcha,
    states,
  ) => {
    dispatch(
      startSignup({ email, name, surname, username, password, captcha }),
    ).then((errorMsg) => {
      setLoadingScreen(false);
      if (errorMsg !== 'success') {
        setError(errorMsg);
        states.captcha.reset();
      } else {
        history.push(`/signup/mail/${email}`);
      }
    });
  };
  const signupForm = {
    columns: {
      email: {
        type: 'TextField',
        label: t('email'),
        autoFocus: true,
        gridForm: { xs: 12, sm: 12 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().email().required(t('required')),
        },
      },
      name: {
        type: 'TextField',
        label: t('name'),
        maxLength: 255,
        gridForm: { xs: 12, sm: 12 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required(t('required')),
        },
      },
      surname: {
        type: 'TextField',
        label: t('surname'),
        initialValue: '',
        maxLength: 255,
        gridForm: { xs: 12, sm: 12 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required(t('required')),
        },
      },
      username: {
        type: 'TextField',
        label: t('username'),
        initialValue: '',
        maxLength: 255,
        gridForm: { xs: 12, sm: 12 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required(t('required')),
        },
      },
      password: {
        type: 'TextField',
        typeTextField: 'password',
        label: 'Password',
        // autoFocus: true,
        gridForm: { xs: 12, sm: 12 },
        variant: 'outlined',
        helperText: t('password_letters_number'),
        validate: {
          shape: Yup.string()
            .required(t('new_password_required'))
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
              t('password_letters_number'),
            )
            .min(8, t('password_8_characters')),
        },
      },
      password2: {
        type: 'TextField',
        typeTextField: 'password',
        label: t('retype_password'),
        gridForm: { xs: 12, sm: 12 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required(t('retype_password_required')),
        },
      },
      captcha: {
        type: 'GoogleReCaptcha',
        sitekey: Pxp.config.recaptchaKey,
      },
    },
    resetButton: false,
    submitLabel: t('create_my_account'),
    onEnterSubmit: true,
    onSubmit: ({ values, states }) => {
      if (values.password !== values.password2) {
        setError(t('passwords_not_match'));
      } else {
        setLoadingScreen(true);
        handleSignup(
          values.email,
          values.name,
          values.surname,
          values.username,
          values.password,
          values.captcha,
          states,
        );
      }
    },
  };
  const handleClose = () => {};
  return (
    <>
      <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle disableTypography id="forgot-dialog-title">
          <Typography variant="h3">{t('create_your_account')}</Typography>
        </DialogTitle>
        <DialogContent>
          <Form data={signupForm} dialog loading={loadingScreen} />
          {error && (
            <FormHelperText error className={classes.error}>
              {error}
            </FormHelperText>
          )}
          <Typography variant="body2">{t('already_have_account')}</Typography>
          <Link href="/login" className={classes.login}>
            {t('login')}
          </Link>
        </DialogContent>
      </Dialog>
      {
        // loadingScreen && <LoadingScreen />
      }
    </>
  );
};
export default SignUpDialog;
