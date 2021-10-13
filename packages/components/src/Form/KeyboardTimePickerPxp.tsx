/**
 * TimePicker Component
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
/* eslint-disable react/jsx-props-no-spreading */

import React, { FC }from 'react';
import 'date-fns';
import Grid from '@mui/material/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  LocalizationProvider,
  TimePicker,
} from '@mui/lab';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import makeStyles from '@mui/styles/makeStyles';
import { TextField, Theme } from '@mui/material';

const useStyles: any = makeStyles((theme:Theme) => ({
  root: {},
  datePicker: {
    marginTop: 0,
    '& + &': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const areEqual = (prev, next) =>
  next.memoDisabled !== false &&
  prev.value === next.value &&
  prev.name === next.name &&
  prev.disabled === next.disabled &&
  prev.error === next.error;

// eslint-disable-next-line react/prop-types
export const KeyboardTimePickerPxpComponent: FC<any> = ({
  name,
  value,
  configInput,
  handleChange,
  error, // is used in areEqual
  disabled = false,
  helperText,
  size = 'medium',
}) => {
  const classes = useStyles();

  const { label, variant, gridForm, minDate, maxDate, minTime } = configInput;

  const minMaxDate = {
    ...(minDate && { minDate }),
    ...(maxDate && { maxDate }),
  };

  return (
    <LocalizationProvider dateAdapter={DateFnsUtils}>
      <Grid key={`grid_${name}`} item {...gridForm}>
        <TimePicker
          className={classes.datePicker}
          /* margin="normal" 
          autoOk */
          label={label}
          value={value}
          onChange={(date) =>
            handleChange({
              name,
              value: date,
            })
          }
          {...minMaxDate}
          OpenPickerButtonProps={{
            'aria-label': 'change time',
          }}
          renderInput={(props) => (
            <TextField {...props} helperText={helperText} size={size} margin="normal" id={name} variant={variant}/>
          )}
          /*keyboardIcon={<AccessTimeIcon />}*/
        />
        {/* <KeyboardDatePicker
          className={classes.datePicker}
          autoOk
          size={size}
          // disableToolbar
          variant={variant}
          format="dd/MM/yyyy"
          margin="normal"
          id={name}
          label={label}
          value={value}
          onChange={(date) =>
            handleChange({
              name,
              value: date,
            })
          }
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          inputVariant="outlined"
          {...minMaxDate}
          disabled={disabled}
          helperText={helperText}
        /> */}
      </Grid>
    </LocalizationProvider>
  );
};

/**
 * A memoized component that will re-render only one of props described in areEqual change.
 */
const KeyboardTimePickerPxp = React.memo(
  (props: any) => <KeyboardTimePickerPxpComponent {...props} />,
  areEqual,
);

export default KeyboardTimePickerPxp;
