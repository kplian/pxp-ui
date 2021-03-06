/**
 * Examples Pickers
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import React from 'react';
import moment from 'moment';
import Form from '../../../_pxp/components/Form/Form';
import BasicContainer from '../../../_pxp/containers/BasicContainer';

const ExamplePicker = () => {
  const config = {
    nameForm: 'Formulario Datepickers',
    columns: {
      date: {
        type: 'DatePicker',
        label: 'Date',
        initialValue: moment(new Date()).toDate(),
        format: 'DD-MM-YYYY',
      },
      dateMinMax: {
        type: 'DatePicker',
        label: 'Date Min Max',
        initialValue: moment(new Date()).toDate(),
        minDate: moment(new Date(), 'DD-MM-YYYY').subtract(5, 'days').toDate(),
        maxDate: moment(new Date(), 'DD-MM-YYYY').add(1, 'month').toDate(),
        format: 'DD-MM-YYYY',
      },
      resetDates: {
        type: 'DatePicker',
        label: 'Reset Dates',
        initialValue: null,
        format: 'DD-MM-YYYY',
        onChange: ({ value, dataValue, configInputState, states }) => {
          console.log(states);
        },
      },
    },
    resetButton: true,
    onSubmit: ({ values }) => {
      // we can send an handle for receiving data from form here
      console.log(values);
    },
  };
  return (
    <BasicContainer>
      <Form data={config} />;
    </BasicContainer>
  );
};

export default ExamplePicker;
