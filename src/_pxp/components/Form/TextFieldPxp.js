/**
 * TextField Component
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
  prev.error === next.error &&
  prev.disabled === next.disabled;

// eslint-disable-next-line react/prop-types
export const TextFieldPxpComponent = ({
  name,
  value,
  configInput,
  handleChange,
  handleBlur,
  error,
  msgError,
  disabled = false,
  helperText,
  size = 'medium',
  inputProps,
}) => {
  const { label, variant, gridForm, typeTextField, autoFocus } = configInput;

  return (
    <Grid key={`grid_${name}`} item {...gridForm}>
      <TextField
        // key={index}
        {...(autoFocus && { autoFocus })}
        error={Boolean(error)}
        fullWidth
        helperText={error ? msgError : helperText}
        label={label}
        // margin="normal"
        name={name}
        onChange={(event) =>
          handleChange({
            event,
            name,
            value: event.target.value,
          })
        }
        value={value}
        variant={variant}
        {...(typeTextField && { type: typeTextField })}
        disabled={disabled}
        onBlur={() => handleBlur(name)}
        size={size}
        {...inputProps}
      />
    </Grid>
  );
};

/**
 * A memoized component that will re-render only one of props described in areEqual change.
 */
const TextFieldPxp = React.memo(
  (props) => <TextFieldPxpComponent {...props} />,
  areEqual,
);

export default TextFieldPxp;
