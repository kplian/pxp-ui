/**
 * Example for each type of columns
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import React from 'react';
import * as Yup from 'yup';
import { simpleForm, configTextField } from './config';
import Form from '../Form';

const ExampleTextField = () => {
  const config = {
    ...simpleForm,
    columns: {
      name: configTextField,
      textfieldHelper: {
        ...configTextField,
        label: 'textfield1',
        gridForm: { xs: 12, sm: 6 },
        helperText: 'Helper Text',
      },
      textfieldDisabled: {
        ...configTextField,
        label: 'textfieldDisabled',
        gridForm: { xs: 12, sm: 6 },
        disabled: true,
      },
      textfieldValidate: {
        ...configTextField,
        label: 'textfieldValidate',
        gridForm: { xs: 12, sm: 6 },
        validate: {
          shape: Yup.string().email().required('Required'), // for validate you can see YUM
        },
      },
    },
  };
  return <Form data={config} />;
};

export default ExampleTextField;
