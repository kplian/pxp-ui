/**
 * AutoCompleteTriggerInForm.js
 * @copyright Disydes 2020
 * @author Favio Figueroa
 */

import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { handleMouseTriggerComponent } from '../../../_pxp/utils/Common';
import Label from '../../../_pxp/components/Label';
import BasicContainer from '../../../_pxp/containers/BasicContainer';
import Form from '../../../_pxp/components/Form/Form';
import DialogPxp from '../../../_pxp/components/DialogPxp';

const AutoCompleteTriggerInForm = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const accountStatusTypeRef: any = useRef();
  const config = {
    nameForm: 'Form Example',
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
    idStore: 'accountStatusTypeId',
    buttonDel: true,
    buttonNew: true,
    buttonEdit: true,
    resetButton: true,
    onSubmit: {
      // when we work with v2 (pxp-nd) we need to add two service
      url: 'pxp/AccountStatusType/add',
      extraParams: {},
      callback: (resp, dataForSending) => {
        console.log(resp);
        console.log(dataForSending);
        const values = {
          ...dataForSending,
          accountStatusTypeId: resp.accountStatusTypeId,
          code: resp.code,
        };
        console.log(values);
        if (
          accountStatusTypeRef &&
          accountStatusTypeRef.current &&
          accountStatusTypeRef.current.states
        ) {
          accountStatusTypeRef.current.states.accountStatusTypeId.setValue(
            values,
          );
        }

        setOpenDialog(false);
      },
      // todo need to add typeSend for change to send all in jsonFormat or normal pxp
    },
    // paginationType: 'infiniteScrolling', // can be infiniteScrolling or pagination
  };

  const handleClickShowComponent = () => {
    setOpenDialog(true);
  };

  const configAutoComplete = {
    nameForm: 'Form Example',
    columns: {
      accountStatusTypeId: {
        type: 'AutoComplete',
        label: 'accountStatusTypeId',
        initialValue: null,
        isSearchable: true,
        memoDisabled: true,
        variant: 'outlined',
        InputProps: {
          endAdornment: (
            <IconButton
              aria-label="toggle open form for adding new data"
              onClick={handleClickShowComponent}
              onMouseDown={handleMouseTriggerComponent}
            >
              <AddIcon />
            </IconButton>
          ),
        },
        helperText: 'Account status type',
        validate: {
          shape: Yup.string().required('Required'),
        },
        store: {
          method: 'GET',
          dataReader: { dataRows: 'data' }, // this config is for change the data received
          url: 'pxp/AccountStatusType/list',
          params: {
            start: '0',
            limit: '10',
            sort: 'code',
            dir: 'desc', // for seeing every time the last save
          },
          parFilters: 'code',
          idDD: 'accountStatusTypeId',
          descDD: 'code',
          minChars: 2,
        },
      },
      date: {
        type: 'DatePicker',
        label: 'Date',
        initialValue: moment(new Date()).toDate(),
        // format: 'DD-MM-YYYY',
        format: 'YYYY-MM-DD',
        grid: false,
        variant: 'outlined',
      },
      description: {
        type: 'TextField',
        initialValue: '',
        label: 'Description',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
      },
      amount: {
        type: 'TextField',
        initialValue: '',
        label: 'Amount',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        filters: { pfiltro: 'name', type: 'string' },
        search: true,
      },
    },
    idStore: 'accountStatusTypeId',
    buttonDel: true,
    buttonNew: true,
    buttonEdit: true,
    resetButton: true,
    onSubmit: {
      // when we work with v2 (pxp-nd) we need to add two service
      url: 'pxp/AccountStatus/add',
      extraParams: {
        tableId: 1,
      },
      // todo need to add typeSend for change to send all in jsonFormat or normal pxp
    },
    urlDelete: 'pxp/AccountStatusType/delete',
  };
  return (
    <>
      <BasicContainer>
        <Form data={configAutoComplete} ref={accountStatusTypeRef} />
      </BasicContainer>
      <DialogPxp
        titleToolbar="Formulario"
        onClose={() => {
          setOpenDialog(false);
        }}
        open={openDialog}
      >
        <Form data={config} />
      </DialogPxp>
    </>
  );
};

export default AutoCompleteTriggerInForm;
