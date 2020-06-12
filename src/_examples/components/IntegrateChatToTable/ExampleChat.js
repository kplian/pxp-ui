/**
 * Example for using Chat (typeChat pxp)
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import React, { useState } from 'react';
import { v4 as uuIdV4 } from 'uuid';
import BasicContainer from '../../../_pxp/containers/BasicContainer';
import TablePxp from '../../../_pxp/components/Table/TablePxp';
import ProductDocuments from '../../../_pxp/icons/ProductDocuments';
import DialogPxp from '../../../_pxp/components/DialogPxp';
import ChatView from '../../../_parameters/components/Chat/ChatView';

const ExampleChat = () => {
  // begin code for open chat view, we need copy that for another tables
  const [chatView, setChatView] = useState({
    open: false,
    table: 'example.tdata_example', // change that for another table
    idTableDesc: 'id_data_example', // change that for another id
    idTable: undefined,
    typeChat: 'CHAT_DATA_EXAMPLE', // Code of tipo_chat
  });
  const openChatView = ({ idTable }) => {
    setChatView((prev) => ({
      ...prev,
      idTable,
      open: true,
      idComponent: uuIdV4(),
    }));
  };
  // end example

  const jsonTypeChat = {
    nameForm: 'Formulario Example chat',
    columns: {
      desc_example: {
        type: 'TextField',
        initialValue: '',
        label: 'Desc Example',
        gridForm: { xs: 12, sm: 12 },
      },
    },
    getDataTable: {
      url: 'example/DataExample/listarDataExample',
      params: {
        start: '0',
        limit: '10',
        sort: 'id_data_example',
        dir: 'desc',
      },
    },
    idStore: 'id_data_example',
    buttonDel: true,
    buttonNew: true,
    actionsTableCell: {
      buttonDel: false,
      buttonEdit: false,
      extraButtons: {
        chat: {
          label: 'example Chat',
          buttonIcon: <ProductDocuments />,
          onClick: (row) => {
            openChatView({
              idTable: row.id_tipo_chat,
            });
          },
        },
      },
    },
    resetButton: true,
    onSubmit: {
      url: 'example/DataExample/insertarDataExample',
    },
    urlDelete: 'example/DataExample/eliminarDataExample',
  };

  return (
    <>
      <BasicContainer>
        <TablePxp dataConfig={jsonTypeChat} />
      </BasicContainer>

      <DialogPxp
        titleToolbar="Chat"
        onClose={() => {
          setChatView({ ...chatView, open: false });
        }}
        open={chatView.open}
      >
        <ChatView
          table={chatView.table}
          idTable={chatView.idTable}
          idTableDesc={chatView.idTableDesc}
          typeChat={chatView.typeChat}
          idComponent={chatView.idComponent}
        />
      </DialogPxp>
    </>
  );
};

export default ExampleChat;
