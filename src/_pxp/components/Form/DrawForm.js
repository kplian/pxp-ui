/**
 * DrawForm Component for rendering the inputs from jsonConfig
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Box, Button } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import InitValues from '../../hooks/InitValues';
import TextFieldPxp from './TextFieldPxp';
import TextFieldSelectPxp from './TextFieldSelectPxp';
import AutocompletePxp from './AutocompletePxp';
import KeyboardDatePickerPxp from './KeyboardDatePickerPxp';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const DrawForm = ({ data, handlers }) => {
  // init the draw and the states
  const states = Object.entries(data.columns).reduce(
    (t, [nameKey, value]) => ({
      ...t,
      [nameKey]: {
        ...InitValues(value),
        memoDisabled: !value.onChange,
      },
    }),
    {},
  );

  const classes = useStyles();

  return (
    <>
      <Grid container spacing={3}>
        {Object.entries(states).map(([nameKey, values], index) => {
          if (values.type === 'TextField') {
            return (
              <TextFieldPxp
                key={index}
                name={nameKey}
                value={values._value.value}
                configInput={values}
                handleChange={handlers.handleChange}
                memoDisabled={values.memoDisabled}
                error={values.validate.error.error.error}
                states={states}
                disabled={values.disabled}
              />
            );
          }

          if (values.type === 'Dropdown') {
            return (
              <TextFieldSelectPxp
                key={index}
                name={nameKey}
                value={values._value.value}
                configInput={values}
                handleChange={handlers.handleChange}
                memoDisabled={values.memoDisabled}
                error={values.validate.error.error.error}
                states={states}
                disabled={values.disabled}
              />
            );
          }

          if (values.type === 'AutoComplete') {
            return (
              <AutocompletePxp
                key={index}
                name={nameKey}
                value={values._value.value}
                configInput={values}
                handleChange={handlers.handleChange}
                loading={values.store.loading}
                memoDisabled={values.memoDisabled}
                states={states}
                open={values.store.open}
                disabled={values.disabled}
              />
            );
          }

          if (values.type === 'DatePicker') {
            return (
              <KeyboardDatePickerPxp
                key={index}
                name={nameKey}
                value={values._value.value}
                configInput={values}
                handleChange={handlers.handleChange}
                memoDisabled={values.memoDisabled}
                error={values.validate.error.error.error}
                states={states}
                disabled={values.disabled}
              />
            );
          }

          return '';
        })}
      </Grid>

      <Box
        mt={2}
        display="flex"
        justifyContent="flex-end"
        className={classes.root}
      >
        {data.resetButton && (
          <Button
            variant="outlined"
            onClick={() => handlers.resetForm({ states })}
          >
            Reset
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => handlers.handleSubmitForm(e, states)}
        >
          {data.submitLabel || 'Submit'}
        </Button>
      </Box>
    </>
  );
};

export default DrawForm;
