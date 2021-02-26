/**
 * Account Status
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */

import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import TotalsAccountStatus from './TotalsAccountStatus';
import Label from '../Label';
import TablePxp from '../Table/TablePxp';
import BasicContainer from '../../containers/BasicContainer';

import 'date-fns';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PageviewIcon from '@material-ui/icons/Pageview';
import HeaderSectionAccountStatus from './HeaderSectionAccountStatus';
import { currencyFormat, formatNumber } from '../../utils/Common';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
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
  const tableRef = useRef();
  const search = () => {
    console.log(tableRef.current);
    console.log(moment(startDate).format(format));
    console.log(moment(endDate).format(format));

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
        initialValue: '',
        store: [
          ...[{ value: '', label: '' }],
          ...(typeTransactionForOptions.length === 0
            ? [
                {
                  value: 'account_payable',
                  label: t('Add Account'),
                },
                { value: 'account_receivable', label: t('account_receivable') },
                { value: 'payment_in_advance', label: t('payment_in_advance') },
                { value: 'payment', label: t('payment') },
                { value: 'adjusting_account', label: t('adjusting_account') },
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
                <Label color="success">
                  <b>{t('amount')}: </b>
                  {currencyFormat({
                    value: row.amount,
                    currencyCode: currencyCode,
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
        renderColumn: (row) => currencyFormat({ value: row.amount, currencyCode }),
      },
    },
    getDataTable: {
      method: 'GET',
      url: 'pxp/AccountStatus/list',
      params: {
        start: '0',
        limit: '10',
        sort: 'createdAt',
        dir: 'desc', // for seeing every time the last save
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
    urlDelete: 'pxp/AccountStatusType/delete',
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={6} sm={6}>
              <KeyboardDatePicker
                fullWidth
                className={classes.datePicker}
                autoOk
                size="medium"
                // disableToolbar
                // variant={variant}
                format="dd/MM/yyyy"
                margin="normal"
                id="startDate"
                label={t('start_date')}
                value={startDate}
                onChange={(date) =>
                  changeDate({
                    name: 'startDate',
                    value: date,
                  })
                }
                inputVariant="outlined"
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <KeyboardDatePicker
                fullWidth
                className={classes.datePicker}
                autoOk
                size="medium"
                // disableToolbar
                // variant={variant}
                format="dd/MM/yyyy"
                margin="normal"
                id="endDate"
                label={t('end_date')}
                value={endDate}
                onChange={(date) =>
                  changeDate({
                    name: 'endDate',
                    value: date,
                  })
                }
                inputVariant="outlined"
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
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
