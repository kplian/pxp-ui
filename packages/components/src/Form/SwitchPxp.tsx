/**
 * TextField Component
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
/* eslint-disable react/jsx-props-no-spreading */

import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const areEqual = (prev, next) =>
  next.memoDisabled !== false &&
  prev.value === next.value &&
  prev.name === next.name &&
  prev.disabled === next.disabled;

// eslint-disable-next-line react/prop-types
export const SwitchPxpComponent: FC<any> = ({
  name,
  value,
  configInput,
  handleChange,
  disabled = false,
  size = 'medium',
}) => {
  const { gridForm, label } = configInput;

  return (
    <Grid key={`grid_${name}`} item {...gridForm}>
      <FormControlLabel
        control={
          <Switch
            size={size}
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
  (props: any) => <SwitchPxpComponent {...props} />,
  areEqual,
);

export default SwitchPxp;
