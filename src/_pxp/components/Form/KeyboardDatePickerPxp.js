/**
 * DatePicker Component
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
  KeyboardDatePicker,
} from '@material-ui/pickers';

import makeStyles from '@material-ui/core/styles/makeStyles';
import enLocale from 'date-fns/locale/en-US';
import esLocale from 'date-fns/locale/es';
import config from '../../../config';

const localeMap = {
  es: esLocale,
  en: enLocale,
};

const useStyles = makeStyles((theme) => ({
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
export const KeyboardDatePickerPxpComponent = ({
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
    <MuiPickersUtilsProvider
      utils={DateFnsUtils}
      locale={localeMap[config.translations.fallbackLng || 'en']}
    >
      <Grid key={`grid_${name}`} item {...gridForm}>
        <KeyboardDatePicker
          fullWidth
          className={classes.datePicker}
          autoOk
          size={size}
          // disableToolbar
          // variant={variant}
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
          inputVariant={variant}
          {...minMaxDate}
          disabled={disabled}
          helperText={helperText}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

/**
 * A memoized component that will re-render only one of props described in areEqual change.
 */
const KeyboardDatePickerPxp = React.memo(
  (props) => <KeyboardDatePickerPxpComponent {...props} />,
  areEqual,
);

export default KeyboardDatePickerPxp;
