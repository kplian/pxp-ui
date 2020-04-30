/**
 * Component Form for rendering a Form with many type from json config of for any pxp-ui project
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */

import React, { useState} from 'react';
import * as Yup from 'yup';
import _ from 'lodash';
import DrawForm from './DrawForm';
import { Box, Button, Card, Container, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import Header from './Header'
import connection from 'pxp-client';
import { useSnackbar } from 'notistack';
import LoadingScreen from "../LoadingScreen";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {},
  bulkOperations: {
    position: 'relative'
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default
  },
  bulkAction: {
    marginLeft: theme.spacing(2)
  },
  queryField: {
    width: 500
  },
  categoryField: {
    flexBasis: 500,
    width: '100%'
  },
  availabilityField: {
    marginLeft: theme.spacing(2),
    flexBasis: 200
  },
  stockField: {
    marginLeft: theme.spacing(2)
  },
  shippableField: {
    marginLeft: theme.spacing(2)
  },
  imageCell: {
    fontSize: 0,
    width: 68,
    flexBasis: 68,
    flexGrow: 0,
    flexShrink: 0
  },
  image: {
    height: 68,
    width: 68
  },

  marginAutoItem: {
    margin: 'auto'
  },

}));



const Form = ({className, rest, data, dialog = false }) => {
  console.log('FORM');

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  //separate json for button submit onSubmit
  const { onSubmit, nameForm } = data;

  // init data with custom values
  const getDateWithFormat = (date, format) => {
    let dateResp;
    if(date) {
      dateResp = moment(date,format).toDate()
    }else {
      dateResp = null;
    }
    return dateResp;
  }

  const setupColumn = (column) => {

    let jsonDate = {};
    if (column.type === 'DatePicker') {
      jsonDate = {
        ...jsonDate,
        initialValue: getDateWithFormat(column.initialValue, column.format),
        // condition if exist min date and maxDate in the config
        ...(column.minDate && { minDate: getDateWithFormat(column.minDate, column.format) }),
        ...(column.maxDate && { maxDate: getDateWithFormat(column.maxDate, column.format) }),
      }
    }

    return {
      ...column,
      ...jsonDate
    }


  }

  const configInitialized = Object.entries(data.columns).reduce((t, [nameKey, value]) => (
    { ...t, [nameKey]: setupColumn(value) }
  ), {});

  const dataInitialized = {
    ...data,
    columns: configInitialized
  }

  // init form data aux like validations and debounce for not processing many times
  const validations = Object.entries(data.columns).filter(([nameKey, value]) => typeof value.validate === 'object').reduce((t, [nameKey, value]) => (
    { ...t, [nameKey]: value.validate.shape }
  ), {});
  const schema = Yup.object().shape(validations);

  // this handle has debounce for start with searching after 500 ms
  const handleInputChange = _.debounce(async (value, isSearchable, store) => {
    if (value && isSearchable && value !== 0 && value.length >= store.minChars) {
      store.set({
        // eslint-disable-next-line max-len
        ...store.state, params: { ...store.state.params, par_filtro: store.parFilters, query: value }
      });
    }
  }, 500);

  const handleChange = ({ event, name, value, data, configInputState, states }) => {
    event && event.preventDefault(); // in some inputs we dont have event like date pickers
    const { _value, validate } = configInputState;

    if (validations[name]) {
      schema.validateAt(name, { [name]: value }).then((valid) => {
        validate.error.setError({ error: false, msg: '' });
      }).catch((err) => {
        validate.error.setError({ error: true, msg: err.message });
      });
    }

    _value.setValue(data || value);

    if (configInputState.onChange) {
      configInputState.onChange({ event, value, data, configInputState, states });
    }


  };

  const handleDateChange = ({event, date, configInputState, states}) => {

    const { _value } = configInputState;
    _value.setValue(date);

  };



  const resetForm = ({states}) => {
    Object.entries(states).forEach(([nameKey, state]) => {
      state._value.setValue('');
    })
  }

  const getValues = (states) => {
    const values = Object.entries(states).reduce((t, [nameKey, state]) => (
      {
        ...t,
        ...(state.type === 'DatePicker' && { [nameKey]: moment(state._value.value).format(state.format)  }),
        ...(state.type === 'AutoComplete' && { [nameKey]: state._value.value[state.store.idDD]  }),
        ...((state.type === 'Dropdown' || state.type === 'TextField') && { [nameKey]: state._value.value  }),
      }
    ), {});
    return values;
  };

  const [loadingScreen, setLoadingScreen] = useState(false);


  // this factory is if exist some error then this  send to draw again the input with error or inputs
  const validateAllValues = (values, states) => {
    try {
      schema.validateSync(values, { abortEarly: false });
    } catch (errors) {
      errors.inner.forEach((error) => {
        states[error.path].validate.error.setError({ error: true, msg:  error.message });
      });
    }
  }

  const sendData = (values, states) => {
    setLoadingScreen(true);
    connection.doRequest({
      url: onSubmit.url,
      params: values
    }).then(resp => {
      if(!resp.error) {
        //need to reset the form
        resetForm({states});
        enqueueSnackbar('Success', {
          variant: 'success',
          action: <Button>See all</Button>
        });
        (typeof onSubmit.callback === 'function') && onSubmit.callback()

      } else {
        enqueueSnackbar('Error', {
          variant: 'error',
          action: <Button>See all</Button>
        });
      }
      setLoadingScreen(false);

    });
  }

  // logic for submit button
  const handleSubmitForm = (e, states) => {
    e.preventDefault();
    const values = { ...getValues(states), ...onSubmit.extraParams };

    validateAllValues(values, states);

    schema.isValid(values)
    .then(function(valid) {
      if(valid) {
        (typeof onSubmit === 'function') ? onSubmit({values, states}) : sendData(values, states)
      }
    });

  };



  const handles = { handleChange, handleInputChange, handleSubmitForm, handleDateChange, resetForm };

  return (
    <>
      {
        (dialog)
          ? <DrawForm data={dataInitialized} handles={handles}/>
          : <Container maxWidth={false}>
              <Header nameForm={nameForm}/>
              <Box mt={3}>
                <Card
                    className={clsx(classes.root, className)}
                    {...rest}
                >
                  <Box p={2}>
                    <Box
                        mt={3}
                        display="flex"
                        alignItems="center"
                    />
                    <DrawForm data={dataInitialized} handles={handles}/>
                  </Box>

                </Card>
              </Box>
            </Container>
      }
      { loadingScreen && <LoadingScreen /> }


    </>
  );
};

export default Form;
