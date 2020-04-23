import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles((theme) => ({
  root: {},
  datePicker: {
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  }
}));

const areEqual = (prev, next) =>
  next.memoDisabled !== false &&
  prev.value === next.value &&
  prev.name === next.name &&
  prev.error === next.error

// eslint-disable-next-line react/prop-types
export const KeyboardDatePickerPxp_ = ({ name, value, configInput, handles, error, states }) => {
  const classes = useStyles();

  console.log('KeyboardDatePickerPxp_', configInput)

  const {validate, label, variant, onChange, gridForm, minDate, maxDate} = configInput;

  const msg = (validate) && validate.error.error.msg;


  const minMaxDate = {
    ...(minDate && { minDate: minDate }),
    ...(maxDate && { maxDate: maxDate }),
  };


  console.log(minMaxDate)

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid key={`grid_${name}`} item {...gridForm}>
        <KeyboardDatePicker
          className={classes.datePicker}
          autoOk

          //disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={value}
          onChange={(date) => handles.handleChange(
            { name: name, value: date, configInputState:configInput, states:states}
            )}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          inputVariant="outlined"
          {...minMaxDate}

        />

      </Grid>
    </MuiPickersUtilsProvider>
  );
};



/**
 * A memoized component that will re-render only one of props described in areEqual change.
 */
const KeyboardDatePickerPxp = React.memo(props => <KeyboardDatePickerPxp_ {...props} />, areEqual);



export default KeyboardDatePickerPxp;
