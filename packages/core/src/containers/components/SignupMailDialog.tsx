/**
 * This dialog shows a confirmation message after a password recovery was requested
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 * */
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SignUpMailDialog = () => {
  const history = useHistory();
  const params: any = useParams();
  const { t } = useTranslation();
  const handleClose = () => {
    history.push('/login');
  };
  return (
    <>
      <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="forgot-dialog-title">
          {
            // <Typography variant="h3">{t('verify_email_proceed')}</Typography>
          }
          <Typography variant="h3">{t('user_info')}</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {
              // t('sent_email_signup_msg', { email: params.email })
            }
            {t('signup_verified_mail_msg', { name: params.email })}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            {t('continue_to_login')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default SignUpMailDialog;
