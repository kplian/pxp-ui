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
 */

/* eslint-disable no-underscore-dangle */
import React, { forwardRef, useEffect, FC } from 'react';
import _ from 'lodash';
import {
  defaultConfig,
  defaultValuesTextField,
  defaultValuesDropdown,
  defaultValuesAutoComplete,
  defaultValuesDatePicker,
  defaultValuesTimePicker,
  defaultValuesSwitch,
  defaultValuesDropzoneArea,
  defaultValuesGoogleReCaptcha,
} from './defaultValues';
import DrawForm from './DrawForm';

const Form: FC<any> = forwardRef((props, ref) => {
  const { data, dialog = false, loading } = props;

  let mergedDataConfig = _.merge({}, defaultConfig, data);
  if (typeof data.groups === 'object') {
    mergedDataConfig = {
      ...mergedDataConfig,
      groups: data.groups,
    };
  }
  // get the default group for columns with group undefined
  const defaultGroup = Object.keys(mergedDataConfig.groups)[0];

  const setupColumn = (nameKey, column) => {
    // we need to init the defaults values too
    const defaultValues = {
      ...(column.type === 'TextField' && { ...defaultValuesTextField }),
      ...(column.type === 'Switch' && { ...defaultValuesSwitch }),
      ...(column.type === 'Dropdown' && { ...defaultValuesDropdown }),
      ...(column.type === 'AutoComplete' && { ...defaultValuesAutoComplete }),
      ...(column.type === 'DatePicker' && { ...defaultValuesDatePicker }),
      ...(column.type === 'TimePicker' && { ...defaultValuesTimePicker }),
      ...(column.type === 'DropzoneArea' && { ...defaultValuesDropzoneArea }),
      ...(column.type === 'GoogleReCaptcha' && {
        ...defaultValuesGoogleReCaptcha,
      }),
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
      },
    }),
    {},
  );

  const dataInitialized = {
    ...mergedDataConfig,
    columns: configInitialized,
  };

  return (
    <>
      <DrawForm
        data={dataInitialized}
        dialog={dialog}
        loading={loading}
        ref={ref}
      />
    </>
  );
});

export default Form;
