import React, { useState } from 'react';
import * as Yup from 'yup';
import moment from 'moment';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import WcIcon from '@material-ui/icons/Wc';
import Label from '../../_pxp/components/Label';
import imgAvatar from '../../_pxp/components/Table/avatar.jpeg';
import Form from '../../_pxp/components/Form/Form';
import BasicContainer from '../../_pxp/containers/BasicContainer';
import TablePxp from '../../_pxp/components/Table/TablePxp';
import DialogPxp from '../../_pxp/components/DialogPxp';
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
                <Label color="success">
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
          { value: 'masculino', label: 'masculino' },
          {
            value: 'femenino',
            label: 'femenino',
          },
        ],
        gridForm: { xs: 12, sm: 6 },
        variant: 'outlined',
      },
    },
    getDataTable: {
      method: 'GET',
      url: 'params/AccountStatusType/list',
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
              tableId: row.accountStatusTypeId,
              open: true,
            });
            alert('llega');
            console.log(accountStatus);
          },
        },
      },
    },
    resetButton: true,
    onSubmit: {
      // when we work with v2 (pxp-nd) we need to add two service
      urlAdd: 'params/AccountStatusType/add',
      urlEdit: 'params/AccountStatusType/edit',
      extraParams: {},
      // todo need to add typeSend for change to send all in jsonFormat or normal pxp
    },
    urlDelete: 'params/AccountStatusType/delete',
    // paginationType: 'infiniteScrolling', // can be infiniteScrolling or pagination
  };

  return (
    <>
      <BasicContainer>
        <TablePxp dataConfig={config} />
      </BasicContainer>
      <DialogPxp
        titleToolbar="AccountStatus"
        onClose={() => {
          setAccountStatus({ ...accountStatus, open: false });
        }}
        open={accountStatus.open}
      >
        <AccountStatus code={accountStatus.code} tableId={accountStatus.tableId} />
      </DialogPxp>
    </>
  );
};

export default AccountStatusType;
