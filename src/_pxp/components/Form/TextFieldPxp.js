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
  prev.error === next.error;

// eslint-disable-next-line react/prop-types
export const TextFieldPxpComponent = ({
  name,
  value,
  configInput,
  handlers,
  error,
  states,
}) => {
  const {
    validate,
    label,
    variant,
    gridForm,
    typeTextField,
    autoFocus,
  } = configInput;

  const msg = validate && validate.error.error.msg;

  return (
    <Grid key={`grid_${name}`} item {...gridForm}>
      <TextField
        // key={index}
        {...(autoFocus && { autoFocus })}
        error={Boolean(error)}
        fullWidth
        helperText={Boolean(error) && msg}
        label={label}
        // margin="normal"
        name={name}
        // onBlur={handleBlur}
        onChange={(event) =>
          handlers.handleChange({
            event,
            name,
            value: event.target.value,
            configInputState: configInput,
            states,
          })
        }
        value={value}
        variant={variant}
        {...(typeTextField && { type: typeTextField })}
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
