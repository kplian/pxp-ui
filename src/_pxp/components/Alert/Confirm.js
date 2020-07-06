/**
 * Dialog for showing a dialog confirm
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
