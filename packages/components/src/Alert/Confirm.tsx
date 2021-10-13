/**
 * Dialog for showing a dialog confirm
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Confirm = ({
  openConfirm,
  setOpenConfirm,
  dialogTitle = '',
  dialogContentText,
  disagree = 'Disagree',
  agree = 'Agree',
  onConfirm,
  data,
}) => {
  const handleClose = () => {
    setOpenConfirm({
      open: false,
    });
  };
  const handleConfirm = () => {
    setOpenConfirm({
      open: false,
    });
    onConfirm(data);
  };

  return (
    <div>
      <Dialog
        open={openConfirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {disagree}
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            {agree}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Confirm;
