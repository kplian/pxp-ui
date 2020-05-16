/**
 * TextField Component
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const areEqual = (prev, next) =>
  next.memoDisabled !== false &&
  prev.value === next.value &&
  prev.name === next.name &&
  prev.disabled === next.disabled;

// eslint-disable-next-line react/prop-types
export const SwitchPxpComponent = ({
  name,
  value,
  configInput,
  handleChange,
  disabled = false,
}) => {
  const { gridForm, label } = configInput;

  return (
    <Grid key={`grid_${name}`} item {...gridForm}>
      <FormControlLabel
        control={
          <Switch
            checked={value}
            disabled={disabled}
            onChange={(event) =>
              handleChange({
                undefined, // for switch we dont need to do preventDefault
                name,
                value: event.target.checked,
              })
            }
            name={name}
            color="primary"
          />
        }
        label={label}
      />
    </Grid>
  );
};

const SwitchPxp = React.memo(
  (props) => <SwitchPxpComponent {...props} />,
  areEqual,
);

export default SwitchPxp;
