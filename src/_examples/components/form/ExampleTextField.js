/**
 * Example for each type of columns
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import React from 'react';
import * as Yup from 'yup';
import { simpleForm, configTextField } from './config';
import Form from '../../../_pxp/components/Form/Form';
import BasicContainer from '../../../_pxp/containers/BasicContainer';

const ExampleTextField = () => {
  const config = {
    ...simpleForm,
    columns: {
      name: configTextField,
      textFieldHelper: {
        ...configTextField,
        label: 'textFieldHelper',
        gridForm: { xs: 12, sm: 6 },
        helperText: 'Helper Text',
      },
      textFieldDisabled: {
        ...configTextField,
        label: 'textFieldDisabled',
        gridForm: { xs: 12, sm: 6 },
        disabled: true,
      },
      textFieldValidate: {
        ...configTextField,
        label: 'textFieldValidate',
        gridForm: { xs: 12, sm: 6 },
        validate: {
          shape: Yup.string().email().required('Required'), // for validate you can see YUM
        },
      },
      textFieldPassword: {
        ...configTextField,
        label: 'textFieldPassword',
        gridForm: { xs: 12, sm: 6 },
        typeTextField: 'password',
        hide: true,
      },
    },
  };
  return (
    <BasicContainer>
      <Form data={config} />
    </BasicContainer>
  );
};

export default ExampleTextField;
