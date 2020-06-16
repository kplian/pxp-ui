/**
 * Component for render the message
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { Avatar, Box, Link, Typography, makeStyles } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    paddingRight: '10px',
    paddingLeft: '10px',
  },
  avatar: {
    height: 32,
    width: 32,
  },
  image: {
    cursor: 'pointer',
    height: 'auto',
    maxWidth: '100%',
    width: 380,
  },
}));

function Message({
  className,
  avatar,
  user,
  userNameFrom,
  idFrom,
  message,
  date,
  ...rest
}) {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" maxWidth={500} ml={user === idFrom ? 'auto' : 0}>
        <Avatar className={classes.avatar} src={avatar} />
        <Box ml={2}>
          <Box
            bgcolor={user === idFrom ? 'secondary.main' : 'background.default'}
            color={user === idFrom ? 'secondary.contrastText' : 'text.primary'}
            py={1}
            px={2}
            borderRadius="borderRadius"
            boxShadow={1}
          >
            <Typography color="inherit" variant="h6">
              {userNameFrom}
            </Typography>
            <Box mt={1}>
              <Typography
                color="inherit"
                variant="body1"
                style={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                }}
              >
                {message}
              </Typography>
            </Box>
          </Box>
          <Box mt={1} display="flex" justifyContent="flex-end">
            <Typography noWrap color="textSecondary" variant="caption">
              {moment(date).fromNow()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Message;
