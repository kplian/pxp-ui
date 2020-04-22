import React, { useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';


const areEqual = (prev, next) =>
  next.memoDisabled !== false &&
  prev.value === next.value &&
  prev.name === next.name &&
  prev.error === next.error

// eslint-disable-next-line react/prop-types
export const TextFieldSelectPxp_ = ({ name, value, configInput, handles, error, states }) => {

  console.log('TextFieldSelectPxp_', name)

  const {validate, label, variant, onChange, gridForm} = configInput;

  const msg = (validate) && validate.error.error.msg;

  return (
    <Grid key={`grid_${name}`} item {...gridForm}>
      <TextField
        // key={index}
        error={Boolean(error)}
        fullWidth
        helperText={Boolean(error) && msg}
        label={label}
        //margin="normal"
        name={name}
          // onBlur={handleBlur}
        onChange={(event) => handles.handleChange({
            event, name, value: event.target.value, configInputState:configInput, states
          })}
        value={value}
        variant={variant}
        select
        SelectProps={{ native: true }}
      >
        {configInput.store.map((opt, indexOpt) => (
          <option
            key={indexOpt}
            value={opt.value}
          >
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
const TextFieldSelectPxp = React.memo(props => <TextFieldSelectPxp_ {...props} />, areEqual);



export default TextFieldSelectPxp;
