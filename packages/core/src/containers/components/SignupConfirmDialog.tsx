/**
 * This dialog shows a confirmation message after a password recovery was requested
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 * */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FormHelperText } from '@mui/material';

import LoadingScreen from '@pxp-ui/components/LoadingScreen';
import { startSignupConfirm } from '../../actions/auth';

const SignUpConfirmDialog = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [error, setError] = React.useState('');
  const dispatch: any = useDispatch();
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [name, setName] = useState('');
  const params: any = useParams();
  const handleClose = () => {
    history.push('/login');
  };

  useEffect(() => {
    const { token } = params;
    dispatch(startSignupConfirm({ token })).then((data) => {
      setLoadingScreen(false);
      if (data.error) {
        setError(data.detail.message);
      } else {
        setName(data.data.name);
        setLoadingScreen(false);
      }
    });
  }, []);

  return (
    <>
      <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="forgot-dialog-title">
          <Typography variant="h3">{t('email_verified')}</Typography>
        </DialogTitle>
        <DialogContent dividers>
          {!error && (
            <Typography gutterBottom>
              {t('signup_verified_mail_msg', { name })}
            </Typography>
          )}
          {error && <FormHelperText error>{error}</FormHelperText>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            {t('continue_to_login')}
          </Button>
        </DialogActions>
      </Dialog>
      {loadingScreen && <LoadingScreen />}
    </>
  );
};
export default SignUpConfirmDialog;
