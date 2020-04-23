import React from 'react';
import InitValues from './../../hooks/InitValues';
import TextFieldPxp from './TextFieldPxp';
import TextFieldSelectPxp from './TextFieldSelectPxp';
import AutocompletePxp from './AutocompletePxp';
import Grid from '@material-ui/core/Grid';
import { Box, Button } from '@material-ui/core';
import KeyboardDatePickerPxp from "./KeyboardDatePickerPxp";

const DrawForm = ({ data, handles }) => {
  //init the draw and the states
  const states = Object.entries(data.columns).reduce((t, [nameKey, value]) => (
    { ...t, [nameKey]: { ...InitValues(value), memoDisabled:(value.onChange) ? false : true } }
  ), {});

  return (
    <>
      <Grid container spacing={3}>
        {
          Object.entries(states).map(([nameKey, values], index) => {

            if (values.type === 'TextField') {
              return (
                <TextFieldPxp key={index}
                              name={nameKey}
                              value={values._value.value}
                              configInput={values}
                              handles={handles}
                              memoDisabled={values.memoDisabled}
                              error={values.validate.error.error.error}
                              states={states}
                />
              );
            }

            if (values.type === 'Dropdown') {
              return (
                <TextFieldSelectPxp key={index}
                              name={nameKey}
                              value={values._value.value}
                              configInput={values}
                              handles={handles}
                              memoDisabled={values.memoDisabled}
                              error={values.validate.error.error.error}
                              states={states}
                />
              );
            }

            if (values.type === 'AutoComplete') {
              return (
                <AutocompletePxp key={index} name={nameKey} value={values._value.value} configInput={values} handles={handles}
                                 loading={values.store.loading} memoDisabled={values.memoDisabled}
                                 states={states} open={values.store.open}
                />
              );
            }

            if (values.type === 'DatePicker') {
              return (
                <KeyboardDatePickerPxp key={index}
                                       name={nameKey}
                                       value={values._value.value}
                                       configInput={values}
                                       handles={handles}
                                       memoDisabled={values.memoDisabled}
                                       error={values.validate.error.error.error}
                                       states={states}
                />
              );
            }

            return ('');
          })

        }
      </Grid>

      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => handles.handleSubmitForm(e, states)}
        >
          Save
        </Button>
      </Box>

    </>
  );
};

export default DrawForm
