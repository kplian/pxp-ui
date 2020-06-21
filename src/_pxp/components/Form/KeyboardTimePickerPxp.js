/**
 * TimePicker Component
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {},
  datePicker: {
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
export const KeyboardTimePickerPxpComponent = ({
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

  const { label, variant, gridForm, minDate, maxDate } = configInput;

  const minMaxDate = {
    ...(minDate && { minDate }),
    ...(maxDate && { maxDate }),
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid key={`grid_${name}`} item {...gridForm}>
        <KeyboardTimePicker
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
            'aria-label': 'change time',
          }}
        />
        {/*<KeyboardDatePicker
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
        />*/}
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

/**
 * A memoized component that will re-render only one of props described in areEqual change.
 */
const KeyboardTimePickerPxp = React.memo(
  (props) => <KeyboardTimePickerPxpComponent {...props} />,
  areEqual,
);

export default KeyboardTimePickerPxp;
