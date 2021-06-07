import React from 'react';
import * as Yup from "yup";
import BasicContainer from "../../../_pxp/containers/BasicContainer";
import Form from "../../../_pxp/components/Form/Form";

const ExampleTextFieldSelect = () => {

  const jsonExample1 = {
    columns: {
      genero: {
        type: 'Dropdown',
        initialValue: 'femenino',
        store: [
          { value: '', label: '' },
          { value: 'masculino', label: 'masculino' },
          { value: 'femenino', label: 'femenino' },
        ],
        validate: {
          shape: Yup.string().required('Required'),
        },
        onChange: (obj) => {
          console.log(obj)
          if(obj.value === 'masculino') {
            obj.states.quien.setValue('favio');
          } else {
            obj.states.quien.setValue('Karen');

          }
        },
        form: true,
      },
      quien: {
        type: 'Dropdown',
        initialValue: 'femenino',
        store: [
          { value: '', label: '' },
          { value: 'favio', label: 'favio' },
          { value: 'Karen', label: 'Karen' },
        ],
        validate: {
          shape: Yup.string().required('Required'),
        },
        form: true,
      },
    },
  };

  return (
    <Form data={jsonExample1}  />

  );
};

export default ExampleTextFieldSelect;
