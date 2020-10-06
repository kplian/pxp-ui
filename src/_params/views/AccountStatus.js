import React from 'react';
import * as Yup from 'yup';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import BasicContainer from '../../_pxp/containers/BasicContainer';
import TablePxp from '../../_pxp/components/Table/TablePxp';
import Label from '../../_pxp/components/Label';

const AccountStatus = ({ code, tableId }) => {
  const config = {
    nameForm: 'AccountStatus',
    dataReader: {
      dataRows: 'data',
      total: 'count', // this total is the count of whole data the count in the query for example the pxp ever sending count
    },
    columns: {
      description: {
        type: 'TextField',
        initialValue: '',
        label: 'Description',
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
      amount: {
        type: 'TextField',
        initialValue: '',
        label: 'amount',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        filters: { pfiltro: 'name', type: 'string' },
        search: true,
      },
    },
    getDataTable: {
      method: 'GET',
      url: 'params/AccountStatus/list',
      params: {
        start: '0',
        limit: '10',
        sort: 'createdAt',
        dir: 'desc', // for seeing every time the last save
        tableId,
        code,
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
            alert('llega');
            console.log(row);
          },
        },
      },
      /* icon: <AddShoppingCartIcon />,
      onClick: (row) => {
        alert('llega');
        console.log(row);
      }, */
    },
    resetButton: true,
    onSubmit: {
      // when we work with v2 (pxp-nd) we need to add two service
      urlAdd: 'params/AccountStatus/add',
      urlEdit: 'params/AccountStatus/edit',
      extraParams: {
        tableId,
        code,
      },
      // todo need to add typeSend for change to send all in jsonFormat or normal pxp
    },
    urlDelete: 'params/AccountStatusType/delete',
    // paginationType: 'infiniteScrolling', // can be infiniteScrolling or pagination
  };

  return (
    <BasicContainer>
      <TablePxp dataConfig={config} />
    </BasicContainer>
  );
};

export default AccountStatus;
