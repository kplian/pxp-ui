/**
 * TextField Select Component
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const areEqual = (prev, next) =>
  next.memoDisabled !== false &&
  prev.value === next.value &&
  prev.name === next.name &&
  prev.disabled === next.disabled &&
  prev.error === next.error;

// eslint-disable-next-line react/prop-types
export const TextFieldSelectPxpComponent = ({
  name,
  value,
  configInput,
  handleChange,
  error,
  msgError,
  disabled = false,
  helperText,
}) => {
  const { label, variant, gridForm } = configInput;


  return (
    <Grid key={`grid_${name}`} item {...gridForm}>
      <TextField
        // key={index}
        error={Boolean(error)}
        fullWidth
        helperText={error ? msgError : helperText}
        label={label}
        // margin="normal"
        name={name}
        // onBlur={handleBlur}
        onChange={(event) =>
          handleChange({
            event,
            name,
            value: event.target.value,
          })
        }
        value={value}
        variant={variant}
        select
        SelectProps={{ native: true }}
        disabled={disabled}
      >
        {configInput.store.map((opt, indexOpt) => (
          // eslint-disable-next-line react/no-array-index-key
          <option key={indexOpt} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </TextField>
    </Grid>
  );
};

/**
 * A memoized component that will re-render only one of props described in areEqual change.
 */
const TextFieldSelectPxp = React.memo(
  (props) => <TextFieldSelectPxpComponent {...props} />,
  areEqual,
);

export default TextFieldSelectPxp;
