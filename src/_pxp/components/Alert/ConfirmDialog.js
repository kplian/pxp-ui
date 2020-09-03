/*
 * ConfirmDialog.js
 * @copyright Kplian 2020
 * @author Favio Figueroa
 */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

const ConfirmDialog = (props) => {
  const { onClose, open, dialogTitle, dialogContentText } = props;

  const [openDialog, setOpenDialog] = useState(
    open === undefined ? true : open,
  );
  const handleCancel = () => {
    setOpenDialog(false);
    onClose(false);
  };

  const handleOk = () => {
    setOpenDialog(false);
    onClose(true);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={openDialog}
    >
      <DialogTitle id="confirmation-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent dividers />
      {dialogContentText}
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
