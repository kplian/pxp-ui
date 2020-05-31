/**
 * Examples for using the manager file
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import React, { useState } from 'react';
import BasicContainer from '../../../_pxp/containers/BasicContainer';
import TablePxp from '../../../_pxp/components/Table/TablePxp';
import DialogPxp from '../../../_pxp/components/DialogPxp';
import ManagerFile from '../../../_parameters/components/ManagerFile/ManagerFile';
import ProductDocuments from '../../../_pxp/icons/ProductDocuments';

const ExampleManagerFile = () => {
  const [managerFile, setIdManagerFile] = useState({
    open: false,
    table: 'segu.tusuario',
    idTableDesc: 'id_usuario',
    idTable: undefined,
  });
  const openManagerFile = ({ idTable }) => {
    setIdManagerFile((prev) => ({
      ...prev,
      idTable,
      open: true,
    }));
  };
  const json = {
    columns: {
      cuenta: {
        type: 'TextField',
        initialValue: '',
        label: 'Cuenta',
        gridForm: { xs: 12, sm: 3 },
        grid: true,
      },
    },
    getDataTable: {
      url: 'seguridad/Usuario/listarUsuario',
      params: {
        start: '0',
        limit: '10',
        sort: 'id_usuario',
        dir: 'desc',
      },
    },
    idStore: 'id_usuario',
    buttonDel: false,
    buttonNew: false,
    buttonEdit: false,
    actionsTableCell: {
      buttonDel: false,
      buttonEdit: false,
      extraButtons: {
        managerFile: {
          label: 'Manager File',
          buttonIcon: <ProductDocuments />,
          onClick: (row) => {
            openManagerFile({
              idTable: row.id_usuario,
            });
          },
        },
      },
    },
  };

  return (
    <>
      <BasicContainer>
        <TablePxp dataConfig={json} />
        <DialogPxp
          titleToolbar="Manager File"
          onClose={() => {
            setIdManagerFile({ ...managerFile, open: false });
          }}
          open={managerFile.open}
        >
          <ManagerFile
            idTable={managerFile.idTable}
            table={managerFile.table}
            idTableDesc={managerFile.idTableDesc}
          />
        </DialogPxp>
      </BasicContainer>
    </>
  );
};

export default ExampleManagerFile;
