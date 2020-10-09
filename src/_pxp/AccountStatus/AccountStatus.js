import React, { useState } from 'react';
import * as Yup from 'yup';


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
import TotalsAccountStatus from './TotalsAccountStatus';
import Label from '../components/Label';
import TablePxp from '../components/Table/TablePxp';
import BasicContainer from '../containers/BasicContainer';

import 'date-fns';
import moment from 'moment';

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

const AccountStatus = ({ code, tableId }) => {
  const classes = useStyles();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const config = {
    nameForm: 'AccountStatus',
    dataReader: {
      dataRows: 'data',
      total: 'count', // this total is the count of whole data the count in the query for example the pxp ever sending count
      dataFooter: 'dataFooter',
    },
    tableFooter: (dataFooter) => {
      console.log(dataFooter);
      return (
        <>
          <TotalsAccountStatus
            totalAmount={dataFooter.totalAmount}
            totalRange={dataFooter.totalRange}
          />
        </>
      );
    },
    columns: {
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
        renderColumn: (row) => {
          return (
            <Box display="flex" alignItems="center">
              <div>
                <Typography variant="body2" color="inherit">
                  <b>Type:</b>
                  {row.type}
                </Typography>
                <Typography variant="body2" color="inherit">
                  <b>Code:</b>
                  {row.code}
                </Typography>
                <Label color="success">
                  <b>Amount:</b>
                  {row.amount}
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
      url: 'pxp/AccountStatus/list',
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
                label="Start Date"
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
                label="End Date"
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
        </Box>
      </Box>
      <TablePxp dataConfig={config} />
    </BasicContainer>
  );
};

export default AccountStatus;
