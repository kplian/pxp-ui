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
import { useHistory } from 'react-router-dom';

const Confirm = () => {
  const history = useHistory();
  const handleClose = () => {
    history.push('/login');
  };
  return (
    <>
      <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle disableTypography id="forgot-dialog-title">
          <Typography variant="h3">Email sent</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Check your email for a message with a link to update your password.
            This link will expire in 24 hours.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Continue to Log In
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Confirm;
