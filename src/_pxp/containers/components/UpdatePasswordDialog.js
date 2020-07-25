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
import { useTranslation } from 'react-i18next';

import Form from '../../components/Form/Form';
import LoadingScreen from '../../components/LoadingScreen';
import { startUpdatePassword } from '../../actions/auth';

const UpdatePassword = () => {
  const [error, setError] = React.useState('');
  const dispatch = useDispatch();
  const [loadingScreen, setLoadingScreen] = useState(false);
  const history = useHistory();
  const params = useParams();
  const { t } = useTranslation();

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
        label: t('new_password'),
        autoFocus: true,
        gridForm: { xs: 12, sm: 12 },
        variant: 'outlined',
        validate: {
          shape: Yup.string()
            .required(t('new_password_required'))
            .min(8, t('password_8_characters'))
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
              t('password_letters_number'),
            ),
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
    },
    resetButton: false,
    submitLabel: t('update_password'), // this is optional
    onEnterSubmit: true,
    onSubmit: ({ values }) => {
      if (values.password1 !== values.password2) {
        setError(t('passwords_not_match'));
      } else {
        setLoadingScreen(true);
        handleUpdate(values.password1, params.token);
      }
    },
  };
  const handleClose = () => { };
  return (
    <>
      <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle disableTypography id="forgot-dialog-title">
          <Typography variant="h3">{t('reset_your_password')}</Typography>
        </DialogTitle>
        <DialogContent>
          {!!params.token && (
            <>
              <Typography gutterBottom>{t('password_must_contain')}</Typography>
              <Typography gutterBottom>
                1. {t('password_8_characters_msg')}
              </Typography>
              <Typography gutterBottom>
                2. {t('password_letters_number_msg')}
              </Typography>
              <br />
              <Form data={updateForm} dialog loading={loadingScreen} />
              {error && (
                <FormHelperText error>
                  <Typography variant="h5">{error}</Typography>
                </FormHelperText>
              )}
            </>
          )}
          {!params.token && (
            <Typography variant="h4">{t('no_token_reset_password')}</Typography>
          )}
        </DialogContent>
      </Dialog>
      {
        // loadingScreen && <LoadingScreen />
      }
    </>
  );
};
export default UpdatePassword;
