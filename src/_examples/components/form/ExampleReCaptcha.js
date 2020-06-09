/**
 * Example for each type of reCaptcha google
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import React from 'react';
import { simpleForm, configTextField } from './config';
import Form from '../../../_pxp/components/Form/Form';
import BasicContainer from '../../../_pxp/containers/BasicContainer';

const ExampleTextField = () => {
  const config = {
    ...simpleForm,
    columns: {
      names: configTextField,
      captcha: {
        type: 'GoogleReCaptcha',
        sitekey: '6LetlQEVAAAAAD0jRgtS7qJAl2mGtyn9K5-DAhGL',
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
