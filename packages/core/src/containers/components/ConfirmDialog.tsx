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
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Confirm = () => {
  const history = useHistory();
  const handleClose = () => {
    history.push('/login');
  };
  const { t } = useTranslation();

  return (
    <>
      <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="forgot-dialog-title">
          <Typography variant="h3">{t('email_sent')}</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{t('confirm_reset_msg')}</Typography>
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
export default Confirm;
