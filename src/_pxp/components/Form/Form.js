/**
 * Component Form for rendering a Form with many type from json config of for any pxp-ui project
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 * These are possible configuration params:
 * @param {boolean} dialog If form is a dilog or not
 * @param {String} classname Name of class to be used in card component
 * @param {Object} data Configuration object
 * @param {String} data.nameForm Name of form which will show in header
 * @param {array} data.columns Columns that will be shown in form you can see each component documentation
 * @param {object} data.onSubmit url and extra params to send on submit form
 * @param {String} data.onSubmit.url url on submit form
 * @param {Object} data.onSubmit.extraParams Object which contain aditional data to send on form submit
 * @example
 *  onSubmit: {
 *    url: 'seguridad/Persona/guardarPersona',
 *    extraParams: {
 *       correo: '',
 *       direccion: ''
 *  }
 *  parameters for columns
 * @param columns.column.validate: {
          shape: Yup.string().required('Required'),
        } if you want allow blank then you do not need to send that parameter
 @param {Object} data.groups you can split the form with many groups
 * @example
 *  groups: {
 *   userGroup: {
 *     titleGroup: '',
 *     gridGroup: { xs: 12, sm: 12 },
 *   },
 * },
 * @todo allow access to fields for show, hide allowblank or not
 * @todo table id where do we define it? Maybe we need to define multiple id as well
 */

/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import _ from 'lodash';
import * as Yup from 'yup';
import { Button, makeStyles } from '@material-ui/core';
import connection from 'pxp-client';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import {
  defaultConfig,
  defaultValuesTextField,
  defaultValuesDropdown,
  defaultValuesAutoComplete,
  defaultValuesDatePicker,
} from './defaultValues';
import LoadingScreen from '../LoadingScreen';
import DrawForm from './DrawForm';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Form = ({ data, dialog = false }) => {
  const classes = useStyles(); // for using
  const { enqueueSnackbar } = useSnackbar();

  let mergedDataConfig = _.merge({}, defaultConfig, data);
  if (typeof data.groups === 'object') {
    mergedDataConfig = {
      ...mergedDataConfig,
      groups: data.groups,
    };
  }

  // separate json for button submit onSubmit
  const { onSubmit, nameForm } = mergedDataConfig;

  const setupColumn = (nameKey, column) => {
    // we need to init the defaults values too
    const defaultValues = {
      ...(column.type === 'TextField' && { ...defaultValuesTextField }),
      ...(column.type === 'Dropdown' && { ...defaultValuesDropdown }),
      ...(column.type === 'AutoComplete' && { ...defaultValuesAutoComplete }),
      ...(column.type === 'DatePicker' && { ...defaultValuesDatePicker }),
      label: nameKey,
    };
    const mergeSetupConfig = _.merge({}, defaultValues, column);
    return mergeSetupConfig;
  };

  const configInitialized = Object.entries(mergedDataConfig.columns).reduce(
    (t, [nameKey, value]) => ({ ...t, [nameKey]: setupColumn(nameKey, value) }),
    {},
  );

  const dataInitialized = {
    ...mergedDataConfig,
    columns: configInitialized,
  };

  // init form data aux like validations and debounce for not processing many times
  const validations = Object.entries(data.columns)
    // eslint-disable-next-line no-unused-vars
    .filter(([nameKey, value]) => typeof value.validate === 'object')
    .reduce(
      (t, [nameKey, value]) => ({ ...t, [nameKey]: value.validate.shape }),
      {},
    );
  const schema = Yup.object().shape(validations);

  const handleChange = ({
    event,
    name,
    value,
    dataValue,
    configInputState,
    states,
  }) => {
    // eslint-disable-next-line no-unused-expressions
    event && event.preventDefault(); // in some inputs we dont have event like date pickers
    const { _value, validate } = configInputState;

    if (validations[name]) {
      schema
        .validateAt(name, { [name]: value })
        .then(() => {
          validate.error.setError({ error: false, msg: '' });
        })
        .catch((err) => {
          validate.error.setError({ error: true, msg: err.message });
        });
    }

    _value.setValue(dataValue || value);

    if (configInputState.onChange) {
      configInputState.onChange({
        event,
        value,
        dataValue,
        configInputState,
        states,
      });
    }
  };

  const resetForm = ({ states }) => {
    // eslint-disable-next-line no-unused-vars
    Object.entries(states).forEach(([nameKey, state]) => {
      state._value.setValue('');
    });
  };

  // this is for giving format to values for send to the backend
  const getValues = (states) => {
    const values = Object.entries(states).reduce(
      (t, [nameKey, state]) => ({
        ...t,
        ...(state.type === 'DatePicker' && {
          [nameKey]: moment(state._value.value).format(state.format),
        }),
        ...(state.type === 'AutoComplete' && {
          [nameKey]: state._value.value[state.store.idDD],
        }),
        ...((state.type === 'Dropdown' || state.type === 'TextField') && {
          [nameKey]: state._value.value,
        }),
      }),
      {},
    );
    return values;
  };

  const [loadingScreen, setLoadingScreen] = useState(false);

  // this factory is if exist some error then this  send to draw again the input with error or inputs
  const validateAllValues = (values, states) => {
    try {
      schema.validateSync(values, { abortEarly: false });
    } catch (errors) {
      errors.inner.forEach((error) => {
        states[error.path].validate.error.setError({
          error: true,
          msg: error.message,
        });
      });
    }
  };

  const sendData = (values, states) => {
    setLoadingScreen(true);
    connection
      .doRequest({
        url: onSubmit.url,
        params: values,
      })
      .then((resp) => {
        if (!resp.error) {
          // need to reset the form
          resetForm({ states });
          enqueueSnackbar('Success', {
            variant: 'success',
            action: <Button>See all</Button>,
          });
          if (typeof onSubmit.callback === 'function') {
            onSubmit.callback();
          }
        } else {
          enqueueSnackbar(resp.detail.message, {
            variant: 'error',
            action: <Button>See all</Button>,
          });
        }
        setLoadingScreen(false);
      });
  };

  // logic for submit button
  const handleSubmitForm = (e, states) => {
    e.preventDefault();
    console.log(onSubmit);
    const values = {
      ...getValues(states),
      ...(onSubmit.extraParams && { ...onSubmit.extraParams }),
    };

    validateAllValues(values, states);

    schema.isValid(values).then((valid) => {
      if (valid) {
        // eslint-disable-next-line no-unused-expressions
        typeof onSubmit === 'function'
          ? onSubmit({ values, states })
          : sendData(values, states);
      }
    });
  };

  const handlers = {
    handleChange,
    handleSubmitForm,
    resetForm,
  };

  return (
    <>
      <DrawForm data={dataInitialized} handlers={handlers} dialog={dialog} />
      {loadingScreen && <LoadingScreen />}
    </>
  );
};

export default Form;
