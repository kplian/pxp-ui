/*
 * ConfirmDialog.js
 * @copyright Kplian 2020
 * @author Favio Figueroa
 */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';

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
