/**
 * Example for using Chat (typeChat pxp)
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import React, { useRef, useState } from 'react';
import { v4 as uuIdV4 } from 'uuid';
import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import BasicContainer from '../../../_pxp/containers/BasicContainer';
import TablePxp from '../../../_pxp/components/Table/TablePxp';
import ProductDocuments from '../../../_pxp/icons/ProductDocuments';
import DialogPxp from '../../../_pxp/components/DialogPxp';
import ChatView from '../../../_parameters/components/Chat/ChatView';
import Pxp from '../../../Pxp';
import LoadingScreen from '../../../_pxp/components/LoadingScreen';

const ExampleChat = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loadingScreen, setLoadingScreen] = useState(false);
  const refTable = useRef();

  // begin code for open chat view, we need copy that for another tables
  const [chatView, setChatView] = useState({
    open: false,
    table: 'example.tdata_example', // change that for another table
    idTableDesc: 'id_data_example', // change that for another id
    idTable: undefined,
    typeChat: 'CHAT_DATA_EXAMPLE', // Code of tipo_chat
    idChat: undefined,
  });
  const openChatView = ({ idTable, idChat }) => {
    setChatView((prev) => ({
      ...prev,
      idTable,
      idChat,
      open: true,
      idComponent: uuIdV4(),
    }));
  };
  // end example
  const createChat = (row) => {
    Pxp.apiClient
      .doRequest({
        url: 'parametros/Chat/insertarChat',
        params: {
          id_tabla: row.id_data_example,
          codigo_tipo_chat: 'CHAT_DATA_EXAMPLE',
          descripcion: 'CHAT_DATA_EXAMPLE: chat example',
          estado_reg: '',
        },
      })
      .then((resp) => {
        setLoadingScreen(false);
        enqueueSnackbar('Success', {
          variant: 'success',
        });
        refTable.current.handleRefresh();
      })
      .catch((err) => {
        setLoadingScreen(false);
        enqueueSnackbar(err.message, {
          variant: 'error',
        });
        refTable.current.handleRefresh();
      });
  };

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
      url: 'example/DataExample/listarDataExampleChat',
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
        createChat: {
          label: 'Create Chat',
          buttonIcon: <ProductDocuments />,
          onClick: (row) => {
            createChat(row);
          },
        },
        chat: {
          label: 'example Chat',
          buttonIcon: <ProductDocuments />,
          onClick: (row) => {
            console.log('roww', row)
            openChatView({
              idTable: row.id_data_example,
              idChat: row.id_chat,
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
    onClickRow: ({ row, statesButtonsTableCell }) => {
      if (row.id_chat) {
        statesButtonsTableCell.chat.enable();
        statesButtonsTableCell.createChat.disable();
      } else {
        statesButtonsTableCell.chat.disable();
        statesButtonsTableCell.createChat.enable();
      }
    },
  };

  return (
    <>
      <BasicContainer>
        <TablePxp dataConfig={jsonTypeChat} ref={refTable} />
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
          idChat={chatView.idChat}
          idSuplant={1582} // we can add id suplant for change the from mensajes
        />
      </DialogPxp>
      {loadingScreen && <LoadingScreen />}
    </>
  );
};

export default ExampleChat;
