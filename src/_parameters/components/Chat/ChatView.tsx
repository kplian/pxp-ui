/**
 * Component for showing the chat for some table(ttipo_chat)
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */
import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ThreadDetails from './ThreadDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
    width:'100%'
  },
}));
const ChatView = ({
  table,
  idTable,
  idTableDesc,
  typeChat,
  idChat,
  idComponent,
  idSuplant,
}) => {
  const classes = useStyles();

  // const event = `${typeChat}_${idTableDesc}_${idTable}_${idChat}`;
  const event = `${typeChat}_${idTableDesc}_${idChat}_${idChat}`;

  console.log('[event chat]', event)
  return (
    <div className={classes.root}>
      <ThreadDetails
        eventWs={event}
        idChat={idChat}
        idComponent={idComponent}
        idSuplant={idSuplant}
      />
    </div>
  );
};

export default ChatView;
