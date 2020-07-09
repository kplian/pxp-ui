/**
 * This dialog shows a confirmation message after a password recovery was requested
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 * */
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SignUpMailDialog = () => {
  const history = useHistory();
  const params = useParams();
  const { t } = useTranslation();
  const handleClose = () => {
    history.push('/login');
  };
  return (
    <>
      <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle disableTypography id="forgot-dialog-title">
          <Typography variant="h3">{t('verify_email_proceed')}</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {t('sent_email_signup_msg', { email: params.email })}
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
