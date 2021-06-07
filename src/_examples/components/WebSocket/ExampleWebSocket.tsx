import React, { useEffect } from 'react';
import {
  webSocketListener,
  sendMessageWs,
  removeWebSocketListener,
} from 'pxp-client/PXPClient';
import { v4 as uuidv4 } from 'uuid';

const ExampleWebSocket = () => {
  const idComponent = uuidv4();
  const event = 'testWebsocket';
  // we need to remove the webSocketListener when the component is unmount
  useEffect(() => {
    return () => {
      removeWebSocketListener({
        idComponent,
        event,
      });
    };
  }, []);

  const listenerMessage = (e) => {
    console.log(e);
  };
  webSocketListener({
    event: 'testWebsocket',
    idComponent,
    handle: (e) => {
      listenerMessage(e);
    },
  });

  const handleClickButton = () => {
    sendMessageWs({
      event,
      msg: 'test msg',
    });
  };
  return <button onClick={handleClickButton}>send message</button>;
};

export default ExampleWebSocket;
