/**
 * AccountStatusType
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */

import React, { useState } from 'react';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Label from '../Label';
import BasicContainer from '@pxp-ui/core/containers/BasicContainer';
import TablePxp from '../Table/TablePxp';
import DialogPxp from '../DialogPxp';
import AccountStatus from './AccountStatus';

const AccountStatusType = () => {
  const [accountStatus, setAccountStatus] = useState({
    code: 'ACCOUNTSTATUSTYPE', // this code is the code that you have configured in the table accountStatusType
    tableId: undefined, // this is the id of the table that you are using
    open: false, // open or close the dialog for seeing the accountStatus of some table that you are using
  });

  const config = {
    nameForm: 'Formulario Persona',
    dataReader: {
      dataRows: 'data',
      total: 'count', // this total is the count of whole data the count in the query for example the pxp ever sending count
    },
    columns: {
      code: {
        type: 'TextField',
        initialValue: '',
        label: 'Code',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        renderColumn: (row) => {
          return (
            <Box display="flex" alignItems="center">
              <div>
                <Typography variant="body2" color="inherit">
                  <b>Code:</b>
                  {row.code}
                </Typography>
                <Label color="success" style={{}}>
                  <b>Name:</b>
                  {row.name}
                </Label>
              </div>
            </Box>
          );
        },
      },
      name: {
        type: 'TextField',
        initialValue: '',
        label: 'Name',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        filters: { pfiltro: 'name', type: 'string' },
        search: true,
      },
      tableName: {
        type: 'TextField',
        initialValue: '',
        label: 'Table Name',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        filters: { pfiltro: 'tableName', type: 'string' },
        search: true,
      },
      keyName: {
        type: 'TextField',
        initialValue: '',
        label: 'Key Name',
        gridForm: { xs: 12, sm: 6 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
      },
      type: {
        type: 'Dropdown',
        label: 'Type',
        initialValue: '',
        store: [
          { value: '', label: '' },
          { value: 'acreedor', label: 'acreedor' },
          {
            value: 'deudor',
            label: 'deudor',
          },
        ],
        gridForm: { xs: 12, sm: 6 },
        variant: 'outlined',
      },
    },
    getDataTable: {
      method: 'GET',
      url: 'pxp/AccountStatusType/list',
      params: {
        start: '0',
        limit: '10',
        sort: 'code',
        dir: 'desc', // for seeing every time the last save
      },
      load: true,
    },
    idStore: 'accountStatusTypeId',
    buttonDel: true,
    buttonNew: true,
    buttonEdit: true,
    actionsTableCell: {
      buttonDel: true,
      buttonEdit: true,
      extraButtons: {
        otherButton: {
          label: 'Account Status',
          buttonIcon: <AddShoppingCartIcon />,
          onClick: (row) => {
            setAccountStatus({
              ...accountStatus,
              tableId: row.accountStatusTypeId, // row.proveedor_id
              open: true,
            });
          },
        },
      },
    },
    resetButton: true,
    onSubmit: {
      // when we work with v2 (pxp-nd) we need to add two service
      urlAdd: 'pxp/AccountStatusType/add',
      urlEdit: 'pxp/AccountStatusType/edit',
      extraParams: {},
      // todo need to add typeSend for change to send all in jsonFormat or normal pxp
    },
    urlDelete: 'pxp/AccountStatusType/delete',
    // paginationType: 'infiniteScrolling', // can be infiniteScrolling or pagination
  };

  return (
    <>
      <BasicContainer>
        <TablePxp dataConfig={config} />
      </BasicContainer>
      <DialogPxp
        titleToolbar="AccountStatus lo que quiera" // change your our description
        onClose={() => {
          setAccountStatus({ ...accountStatus, open: false });
        }}
        open={accountStatus.open}
      >
        <AccountStatus
          code={accountStatus.code}
          tableId={accountStatus.tableId}
        />
      </DialogPxp>
    </>
  );
};

export default AccountStatusType;
