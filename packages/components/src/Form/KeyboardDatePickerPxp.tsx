/**
 * DatePicker Component
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
/* eslint-disable react/jsx-props-no-spreading */

import React, { FC } from 'react';
import 'date-fns';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  LocalizationProvider,
  DatePicker,
} from '@mui/lab';

import makeStyles from '@mui/styles/makeStyles';
import enLocale from 'date-fns/locale/en-US';
import esLocale from 'date-fns/locale/es';
import Pxp from '@pxp-ui/core/Pxp';

const localeMap = {
  es: esLocale,
  en: enLocale,
};
import { Theme } from '@mui/material';

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
export const KeyboardDatePickerPxpComponent: FC<any> = ({
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
    <LocalizationProvider
      dateAdapter={DateFnsUtils}
      locale={localeMap[Pxp.config.translations.fallbackLng || 'en']}
    >
      <Grid key={`grid_${name}`} item {...gridForm}>
        <DatePicker
          className={classes.datePicker}         
          // disableToolbar
          // variant={variant}
          inputFormat="dd/MM/yyyy"
          label={label}
          value={value}
          onChange={(date) =>
            handleChange({
              name,
              value: date,
            })
          }
          OpenPickerButtonProps={{
            'aria-label': 'change date',
          }}
          
          {...minMaxDate}
          disabled={disabled}
          renderInput={(props) => (
            <TextField {...props} helperText={helperText} size={size} margin="normal" id={name} variant={variant}/>
          )}
        />
      </Grid>
    </LocalizationProvider>
  );
};

/**
 * A memoized component that will re-render only one of props described in areEqual change.
 */
const KeyboardDatePickerPxp = React.memo(
  (props: any) => <KeyboardDatePickerPxpComponent {...props} />,
  areEqual,
);

export default KeyboardDatePickerPxp;
