/* eslint-disable consistent-return */
/**
 * Account Status
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */

import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import makeStyles from '@mui/styles/makeStyles';
import DateFnsUtils from '@date-io/date-fns';
import {
  LocalizationProvider,
  DatePicker,
} from '@mui/lab';
import Grid from '@mui/material/Grid';
import moment from 'moment';

import IconButton from '@mui/material/IconButton';
import PageviewIcon from '@mui/icons-material/Pageview';
import { red } from '@mui/material/colors';
import { useTranslation } from 'react-i18next';
import HeaderSectionAccountStatus from './HeaderSectionAccountStatus';
import { currencyFormat, formatNumber } from '@pxp-ui/core/utils/Common';
import Label from '../Label';
import TablePxp from '../Table/TablePxp';
import BasicContainer from '@pxp-ui/core/containers/BasicContainer';
import 'date-fns';
import { TextField, Theme } from '@mui/material';


  const useStyles: any = makeStyles((theme:Theme) => ({
    root: {},
    bulkOperations: {
      position: 'relative',
    },
    bulkActions: {
      paddingLeft: 4,
      paddingRight: 4,
      marginTop: 6,
      position: 'absolute',
      width: '100%',
      zIndex: 2,
      backgroundColor: theme.palette.background.default,
    },
    bulkAction: {
      marginLeft: theme.spacing(2),
    },
    queryField: {
      width: 500,
    },
    categoryField: {
      flexBasis: 200,
    },
    availabilityField: {
      marginLeft: theme.spacing(2),
      flexBasis: 200,
    },
    stockField: {
      marginLeft: theme.spacing(2),
    },
    shippableField: {
      marginLeft: theme.spacing(2),
    },
    imageCell: {
      fontSize: 0,
      width: 68,
      flexBasis: 68,
      flexGrow: 0,
      flexShrink: 0,
    },
    image: {
      height: 68,
      width: 68,
    },

    datePicker: {
      marginTop: 0,
      '& + &': {
        marginLeft: theme.spacing(2),
      },
    },
  }));

  const AccountStatus = ({
    code,
    tableId,
    typeTransactionForOptions = [],
    currencyCode = 'Bs',
  }) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const format = 'YYYY-MM-DD';
    const now = moment();
    const [startDate, setStartDate] = useState(
      moment(now.format('YYYY-MM-01'), format).toDate(),
    );
    const [endDate, setEndDate] = useState(now.toDate());

    const [hasBeenRefreshed, setHasBeenRefreshed] = useState();
    const tableRef: any = useRef();
    const search = () => {
      // console.log(tableRef.current);
      // console.log(moment(startDate).format(format));
      // console.log(moment(endDate).format(format));

      tableRef.current.jsonStore.set((prevData) => {
        if (prevData) {
          return {
            ...prevData,
            params: {
              ...prevData.params,
              startDate: moment(startDate).format(format),
              endDate: moment(endDate).format(format),
            },
          };
        }
      });
    };

    const config = {
      nameForm: t('account_status'),
      dataReader: {
        dataRows: 'data',
        total: 'count', // this total is the count of whole data the count in the query for example the pxp ever sending count
        // dataFooter: 'extraData',
        dataHeaderSection: 'extraData',
      },
      headerSection: (dataHeaderSection) => {
        // this header is after of the table
        return (
          <>
            {dataHeaderSection && (
              <HeaderSectionAccountStatus
                data={dataHeaderSection}
                currencyCode={currencyCode}
              />
            )}
          </>
        );
      },
      /* tableFooter: (dataFooter) => {
        return (
          <>
            {dataFooter && (
              <TotalsAccountStatus
                data={dataFooter}
              />
            )}

          </>
        );
      }, */
      columns: {
        typeTransaction: {
          type: 'Dropdown',
          label: t('type_transaction'),
          initialValue: 'payment',
          store: [
            ...[{ value: '', label: '' }],
            ...(typeTransactionForOptions.length === 0
              ? [
                  { value: 'payment', label: t('payment') },
                  { value: 'payment_in_advance', label: t('payment_in_advance') },
                  { value: 'adjusting_account', label: t('adjusting_account') },
                  { value: 'account_payable', label: t('account_payable') },
                  { value: 'account_receivable', label: t('account_receivable') },
                ]
              : []),
            ...typeTransactionForOptions,
          ],
          /* store: [
            { value: '', label: '' },
            ...(typeTransactionForOptions.length === 0 && [
              {
                value: 'account_payable',
                label: t('account_payable'),
              },
              { value: 'account_receivable', label: t('account_receivable') },
              { value: 'payment_in_advance', label: t('payment_in_advance') },
              { value: 'payment', label: t('payment') },
              { value: 'adjusting_account', label: t('adjusting_account') },
            ]),
          ], */
          gridForm: { xs: 12, sm: 6 },
          variant: 'outlined',
          validate: {
            shape: Yup.string().required('Required'),
          },
          /* onChange: (resObj) => {
            console.log(resObj);
            switch (resObj.value) {
              case 'account payable':
              case 'account receivable':
                alert('+');
                break;
              case 'payment in advance':
              case 'payment':
                alert('-');
                break;
              default:
                alert('cualquiera');
            }
          }, */
          grid: false,
        },
        date: {
          type: 'DatePicker',
          label: t('date'),
          initialValue: moment(new Date()).toDate(),
          // format: 'DD-MM-YYYY',
          format: 'YYYY-MM-DD',
          grid: false,
          variant: 'outlined',
          gridForm: { xs: 12, sm: 6 },
        },
        description: {
          type: 'TextField',
          initialValue: '',
          label: t('description'),
          gridForm: { xs: 12, sm: 6 },
          variant: 'outlined',
          validate: {
            shape: Yup.string().required('Required'),
          },
          search: true,
          filters: { pfiltro: 'description', type: 'string' },
          renderColumn: (row) => {
            return (
              <Box display="flex" alignItems="center">
                <div>
                  <Typography variant="body2" color="inherit">
                    <b>{t('type_transaction')} : </b>
                    {t(row.typeTransaction)}
                  </Typography>
                  <Typography variant="body2" color="inherit">
                    <b>{t('date')}: </b>
                    {moment(row.date).format('DD-MM-YYYY')}
                  </Typography>
                  <Typography variant="body2" color="inherit">
                    <b>{t('description')}: </b>
                    {row.description}
                  </Typography>
                  <Label color="success" style={{}}>
                    <b>{t('amount')}: </b>
                    {currencyFormat({
                      value: row.amount,
                      currencyCode,
                    })}
                  </Label>
                </div>
              </Box>
            );
          },
        },
        amount: {
          type: 'TextField',
          initialValue: '',
          label: t('amount'),
          gridForm: { xs: 12, sm: 6 },
          variant: 'outlined',
          validate: {
            // shape: Yup.string().required('Required'),
            shape: Yup.string()
              .required('Required')
              .matches(/^(?:\d*\.\d{1,2}|\d+)$/, t('invalid_decimal_number')),
          },
          filters: { pfiltro: 'amount', type: 'string' },
          search: true,

          renderColumn: (row) => {
            const formantAmount = currencyFormat({
              value: row.amount,
              currencyCode,
            });
            return (
              <span
                style={{
                  color: parseFloat(row.amount) < 0 ? red[500] : undefined,
                  fontSize: '1rem',
                  textAlign: 'center',
                }}
              >
                {formantAmount}
              </span>
            );
          },
        },
      },
      getDataTable: {
        method: 'GET',
        url: 'pxp/AccountStatus/list',
        params: {
          start: '0',
          limit: '10',
          sort: 'createdAt',
          dir: 'ASC', // for seeing every time the last save
          tableId,
          code,
          startDate: moment(startDate).format(format),
          endDate: moment(endDate).format(format),
        },
        load: true,
      },
      // idStore: 'accountStatusId',
      idStore: 'account_status_id',
      buttonDel: true,
      buttonNew: true,
      buttonEdit: true,
      actionsTableCell: {
        buttonDel: true,
        buttonEdit: false,
        /* icon: <AddShoppingCartIcon />,
        onClick: (row) => {
          alert('llega');
          console.log(row);
        }, */
      },
      resetButton: true,
      onSubmit: {
        // when we work with v2 (pxp-nd) we need to add two service
        urlAdd: 'pxp/AccountStatus/add',
        urlEdit: 'pxp/AccountStatus/edit',
        extraParams: {
          tableId,
          code,
        },
        // todo need to add typeSend for change to send all in jsonFormat or normal pxp
      },
      urlDelete: 'pxp/AccountStatus/delete',
      // paginationType: 'infiniteScrolling', // can be infiniteScrolling or pagination
    };

    const changeDate = ({ name, value }) => {
      if (name === 'startDate') {
        setStartDate(value);
      } else {
        setEndDate(value);
      }
    };

    return (
      <BasicContainer>
        <Box p={2}>
          <Box display="flex" alignItems="center" />
          <Box mt={3} display="flex" alignItems="center">
            <LocalizationProvider dateAdapter={DateFnsUtils}>
              <Grid item xs={6} sm={6}>
                <DatePicker
                  className={classes.datePicker}
                  // autoOk
                  // disableToolbar
                  // variant={variant}
                  inputFormat="dd/MM/yyyy"
                  label={t('start_date')}
                  value={startDate}
                  onChange={(date) =>
                    changeDate({
                      name: 'startDate',
                      value: date,
                    })
                  }
                  OpenPickerButtonProps={{
                    'aria-label': 'change date',
                  }}
                  renderInput={(props) => (
                    <TextField {...props} size="medium" margin="normal" id="startDate" variant="outlined"/>
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <DatePicker
                  className={classes.datePicker}
                  // autoOk
                  // size="medium"
                  // disableToolbar
                  // variant={variant}
                  inputFormat="dd/MM/yyyy"
                  label={t('end_date')}
                  value={endDate}
                  onChange={(date) =>
                    changeDate({
                      name: 'endDate',
                      value: date,
                    })
                  }
                  OpenPickerButtonProps={{
                    'aria-label': 'change date',
                  }}
                  renderInput={(props) => (
                    <TextField {...props} size="medium" margin="normal" id="endDate" variant="outlined"/>
                  )}
                />
              </Grid>
            </LocalizationProvider>
            <IconButton aria-label="delete" onClick={() => search()}>
              <PageviewIcon />
            </IconButton>
          </Box>
        </Box>
        <TablePxp dataConfig={config} ref={tableRef} />
      </BasicContainer>
    );
  };

  AccountStatus.prototypes = {
    code: PropTypes.string.isRequired,
    tableId: PropTypes.number.isRequired,
  };
  export default AccountStatus;

