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
  defaultValuesSwitch,
} from './defaultValues';
import LoadingScreen from '../LoadingScreen';
import DrawForm from './DrawForm';

const Form = ({ data, dialog = false }) => {
  let mergedDataConfig = _.merge({}, defaultConfig, data);
  if (typeof data.groups === 'object') {
    mergedDataConfig = {
      ...mergedDataConfig,
      groups: data.groups,
    };
  }
  // get the default group for columns with group undefined
  const defaultGroup = Object.keys(mergedDataConfig.groups)[0];

  // init form data aux like validations and debounce for not processing many times
  const validations = Object.entries(data.columns)
    // eslint-disable-next-line no-unused-vars
    .filter(([nameKey, value]) => typeof value.validate === 'object')
    .reduce(
      (t, [nameKey, value]) => ({
        ...t,
        [nameKey]: value.validate.shape,
      }),
      {},
    );
  const schema = Yup.object().shape(validations);

  const setupColumn = (nameKey, column) => {
    // we need to init the defaults values too
    const defaultValues = {
      ...(column.type === 'TextField' && { ...defaultValuesTextField }),
      ...(column.type === 'Switch' && { ...defaultValuesSwitch }),
      ...(column.type === 'Dropdown' && { ...defaultValuesDropdown }),
      ...(column.type === 'AutoComplete' && { ...defaultValuesAutoComplete }),
      ...(column.type === 'DatePicker' && { ...defaultValuesDatePicker }),
      label: nameKey,
      ...(column.group === undefined && { group: defaultGroup }),
    };

    const mergeSetupConfig = _.merge({}, defaultValues, column);
    return mergeSetupConfig;
  };

  const configInitialized = Object.entries(mergedDataConfig.columns).reduce(
    (t, [nameKey, value]) => ({
      ...t,
      [nameKey]: {
        ...setupColumn(nameKey, value),
        ...(validations[nameKey] && { shape: validations[nameKey] }),
      },
    }),
    {},
  );

  const schemaByGroup = {};
  Object.entries(mergedDataConfig.groups).forEach(([nameGroup]) => {
    const validationsByGroup = Object.entries(configInitialized)
      // eslint-disable-next-line no-unused-vars
      .filter(
        ([nameKey, value]) =>
          typeof value.shape === 'object' && value.group === nameGroup,
      )
      .reduce(
        (t, [nameKey, value]) => ({
          ...t,
          [nameKey]: value.validate.shape,
        }),
        {},
      );
    const schemaAux = Yup.object().shape(validationsByGroup);
    schemaByGroup[nameGroup] = schemaAux;
  });

  const dataInitialized = {
    ...mergedDataConfig,
    columns: configInitialized,
  };

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
    const { setValue, setError } = configInputState;

    if (validations[name]) {
      schema
        .validateAt(name, { [name]: value })
        .then(() => {
          setError({ hasError: false, msg: '' });
        })
        .catch((err) => {
          setError({ hasError: true, msg: err.message });
        });
    }

    const valueOfType =
      configInputState.type === 'AutoComplete' ? dataValue : value;

    setValue(valueOfType);

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

  const handlers = {
    handleChange,
  };

  return (
    <>
      <DrawForm
        data={dataInitialized}
        handlers={handlers}
        dialog={dialog}
        schema={schema}
        schemaByGroup={schemaByGroup}
      />
    </>
  );
};

export default Form;
