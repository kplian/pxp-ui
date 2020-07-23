/**
 * Component for render the form for sending message
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Box,
  Divider,
  IconButton,
  Input,
  Paper,
  Tooltip,
  makeStyles,
} from '@material-ui/core';
import PaperPlane from '../../../_pxp/icons/PaperPlane';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
  },
  divider: {
    width: 1,
    height: 24,
  },
  fileInput: {
    display: 'none',
  },
}));

function MessageAdd({
  className,
  disabled,
  thread,
  onAdd,
  eventWs,
  handleSend,
  ...rest
}) {
  const classes = useStyles();

  const [message, setMessage] = useState('');
  const handleChange = (event) => {
    event.persist();
    setMessage(event.target.value);
  };
  const handleResetInput = () => {
    setMessage('');
  };
  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      handleSend(message, handleResetInput);
    }
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Paper variant="outlined" component={Box} flexGrow={1} ml={2} p={1}>
        <Input
          className={classes.input}
          disableUnderline
          fullWidth
          value={message}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          placeholder="Leave a message"
        />
      </Paper>
      <Tooltip title="Send">
        <span>
          <IconButton
            color="secondary"
            disabled={!message || disabled}
            onClick={() => handleSend(message, handleResetInput)}
          >
            <PaperPlane fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
      <Divider className={classes.divider} />
    </div>
  );
}

export default MessageAdd;
