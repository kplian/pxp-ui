/**
 * Component for config the typeChat
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import React, { useState } from 'react';
import { v4 as uuIdV4 } from 'uuid';
import BasicContainer from '../../../_pxp/containers/BasicContainer';
import TablePxp from '../../../_pxp/components/Table/TablePxp';
import ProductDocuments from '../../../_pxp/icons/ProductDocuments';
import DialogPxp from '../../../_pxp/components/DialogPxp';
import ChatView from '../Chat/ChatView';

const TypeChat = () => {
  // begin code for open chat view, we need copy that for another tables
  const [chatView, setChatView] = useState({
    open: false,
    table: 'param.ttipo_chat', // change that for another table
    idTableDesc: 'id_tipo_chat', // change that for another id
    idTable: undefined,
    typeChat: 'CHATEXAMPLE', // Code of tipo_chat
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
    nameForm: 'Formulario Type Chat',
    columns: {
      codigo: {
        type: 'TextField',
        initialValue: '',
        label: 'Codigo',
        gridForm: { xs: 12, sm: 12 },
      },
      nombre: {
        type: 'TextField',
        initialValue: '',
        label: 'Nombre',
        gridForm: { xs: 12, sm: 12 },
      },
      grupo: {
        type: 'TextField',
        initialValue: '',
        label: 'Grupo',
        gridForm: { xs: 12, sm: 12 },
      },
      tabla: {
        type: 'TextField',
        initialValue: '',
        label: 'Tabla',
        gridForm: { xs: 12, sm: 12 },
      },
      nombre_id: {
        type: 'TextField',
        initialValue: '',
        label: 'Nombre Id',
        gridForm: { xs: 12, sm: 12 },
      },
      tipo_chat: {
        type: 'Dropdown',
        label: 'Tipo Chat',
        initialValue: '',
        store: [
          { value: '', label: '' },
          { value: 'grupo', label: 'grupo' },
          {
            value: 'servicio',
            label: 'servicio',
          },
        ],
        gridForm: { xs: 12, sm: 6 },
        variant: 'outlined',
      },
    },
    getDataTable: {
      url: 'parametros/TipoChat/listarTipoChat',
      params: {
        start: '0',
        limit: '10',
        sort: 'id_tipo_chat',
        dir: 'desc',
      },
    },
    idStore: 'id_tipo_chat',
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
      url: 'parametros/TipoChat/insertarTipoChat',
    },
    urlDelete: 'parametros/TipoChat/eliminarTipoChat',
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

export default TypeChat;
