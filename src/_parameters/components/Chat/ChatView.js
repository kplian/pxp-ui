/**
 * Component for showing the chat for some table(ttipo_chat)
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */
import React, { useEffect } from 'react';
import {
  removeWebSocketListener,
  sendMessageWs,
  webSocketListener,
} from 'pxp-client';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Message from './Message';
import ThreadDetails from './ThreadDetails';
import BasicContainer from '../../../_pxp/containers/BasicContainer';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
  },
}));
const ChatView = ({ table, idTable, idTableDesc, typeChat, idComponent }) => {
  const classes = useStyles();

  const event = `${typeChat}_${idTableDesc}_${idTable}`;

  return (
    <div className={classes.root}>
      <ThreadDetails eventWs={event} idComponent={idComponent} />
    </div>
  );
};

export default ChatView;
