import React from 'react';
import moment from 'moment';
import Form from '../Form';

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
        }
      },
    },
    resetButton: true,
    onSubmit: ({ values }) => {
      // we can send an handle for receiving data from form here
      console.log(values);
    },
  };
  return <Form data={config} />;
};

export default ExamplePicker;
