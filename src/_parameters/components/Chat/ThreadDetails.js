/**
 * Component for draw the chat (message and messageAdd)
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import React, { useEffect, useRef, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Box, Divider } from '@material-ui/core';

import {
  removeWebSocketListener,
  sendMessageWs,
  webSocketListener,
} from 'pxp-client';
import { Scrollbars } from 'react-custom-scrollbars';
import { v4 as uuIdV4 } from 'uuid';
import Message from './Message';
import MessageAdd from './MessageAdd';
import useJsonStore from '../../../_pxp/hooks/useJsonStore';
import Pxp from '../../../Pxp';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.dark,
  },
}));
const ThreadDetails = ({ eventWs, idComponent }) => {
  const classes = useStyles();
  const messagesRef = useRef(null);

  const [user, setUser] = useState();

  const getDataTable = {
    url: 'parametros/Mensaje/listarMensaje',
    params: {
      start: '0',
      limit: '10',
      sort: 'id_mensaje',
      dir: 'asc', // for seeing every time the last save
      contenedor: 'docs-per',
    },
  };

  const { data, setData } = useJsonStore(getDataTable);

  const listenerMessage = (e) => {
    console.log(e);
    setData((prevData) => {
      if (prevData) {
        return {
          ...prevData,
          datos: prevData.datos.concat([
            {
              id_usuario_from: e.from.idUser,
              user_name_from: e.from.user,
              mensaje: e.mensaje,
            },
          ]),
        };
      }
    });
    messagesRef.current.scrollToBottom(0);
  };
  useEffect(() => {
    console.log('data', data);
  }, [data]);
  // mount
  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    setUser(Pxp.apiClient._authenticated.id_usuario);
    webSocketListener({
      event: eventWs,
      idComponent,
      handle: (e) => {
        listenerMessage(e);
      },
    });
  }, []);

  // we need to remove the webSocketListener when the component is unmount
  useEffect(() => {
    return () => {
      console.log('desmontar');
      removeWebSocketListener({
        idComponent,
        event: eventWs,
      });
    };
  }, []);

  const handleSend = (message, callback) => {
    setData((prevData) => {
      if (prevData) {
        return {
          ...prevData,
          datos: prevData.datos.concat([
            {
              id_mensaje: uuIdV4(),
              id_usuario_from: user,
              user_name_from: Pxp.apiClient._authenticated.nombre_usuario,
              mensaje: message,
            },
          ]),
        };
      }
    });
    sendMessageWs({
      event: eventWs,
      msg: message,
    });
    setTimeout(() => {
      messagesRef.current.scrollToBottom(0);
    }, 100);
    callback();
  };

  return (
    <div className={classes.root}>
      <Divider />
      <Box
        flexGrow={1}
        p={2}
        ref={messagesRef}
        component={Scrollbars}
        options={{ suppressScrollX: true }}
      >
        {data &&
          data.datos.map((i) => (
            <Message
              key={i.id_mensaje}
              user={user}
              userNameFrom={i.user_name_from}
              idFrom={i.id_usuario_from}
              message={i.mensaje}
            />
          ))}
      </Box>
      <MessageAdd eventWs={eventWs} handleSend={handleSend} />
    </div>
  );
};

export default ThreadDetails;
