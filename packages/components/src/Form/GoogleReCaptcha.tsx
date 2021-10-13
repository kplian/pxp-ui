/**
 * Google ReCaptcha Component
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef, FC } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Grid from '@mui/material/Grid';

export const GoogleReCaptchaPxpComponent: FC<any> = forwardRef(
  ({ name, sitekey, configInput, handleChange, error, msgError }, ref) => {
    const { gridForm } = configInput;

    return (
      <Grid key={`grid_${name}`} item {...gridForm}>
        <ReCAPTCHA
          ref={ref}
          theme="white"
          sitekey={sitekey}
          onChange={(captchaValue) =>
            handleChange({
              undefined,
              name,
              value: captchaValue,
            })
          }
        />
      </Grid>
    );
  },
);

export default GoogleReCaptchaPxpComponent;
