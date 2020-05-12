/**
 * AutoComplete Component
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 * @param {String} name Is the key of columns object
 * @param {String} value Init value for component
 * @param {configInput} data Configuration object
 * @param {Object} handles Object containing all form handlers
 * @param {loading} data.columns Columns that will be shown in form you can see each component documentation
 * @param {states} data.onSubmit url and extra params to send on submit form
 */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { CircularProgress, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';

const areEqual = (prev, next) =>
  next.memoDisabled !== false &&
  prev.value === next.value &&
  prev.name === next.name &&
  prev.loading === next.loading &&
  prev.open === next.open &&
  prev.error === next.error;

const AutocompletePxpComponent = ({
  name,
  value, // is used in areEqual
  configInput,
  handleChange,
  loading, // is used in areEqual
  states,
  disabled = false,
  helperText,
  error,
  msgError,
}) => {
  const {
    label,
    variant,
    store,
    isSearchable,
    gridForm,
    validate,
  } = configInput;

  // this handle has debounce for start with searching after 500 ms
  const handleInputChange = _.debounce(async (valueInput) => {
    if (
      valueInput &&
      isSearchable &&
      valueInput !== 0 &&
      valueInput.length >= store.minChars
    ) {
      store.set({
        ...store.state,
        params: {
          ...store.state.params,
          par_filtro: store.parFilters,
          query: valueInput,
        },
      });
    }
  }, 500);


  return (
    <Grid key={`grid_${name}`} item {...gridForm}>
      <Autocomplete
        // key={index}
        id={name}
        onInputChange={(e) =>
          handleInputChange(e.target.value, isSearchable, store)
        }
        open={store.open}
        onOpen={() => {
          store.setOpen(true);
        }}
        onClose={() => {
          store.setOpen(false);
        }}
        // getOptionSelected={(option, value) => option.value === value.value}
        getOptionSelected={(option, value) => option.value === value.value}
        getOptionLabel={(option) => option[store.descDD]}
        options={
          store.data
            ? store.data.datos.map((i) => ({
                ...i,
                value: i[store.idDD],
                label: i[store.descDD],
              }))
            : [] // we need to send empty array for init form
        }
        loading={store.loading}
        renderInput={(params) => (
          <TextField
            {...params}
            error={Boolean(error)}
            helperText={error ? msgError : helperText}
            label={label}
            variant={variant}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {store.loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        onChange={(event, newValue) => {
          handleChange({
            event,
            name,
            value: newValue ? newValue[store.idDD] : '',
            dataValue: newValue,
            configInputState: configInput,
            states,
          });
        }}
        renderOption={
          store.renderOption ? (option) => store.renderOption(option) : null
        }
        disabled={disabled}
      />
    </Grid>
  );
};

// export default AutocompletePxp;

/**
 * A memoized component that will re-render only one of props described in areEqual change.
 */
const AutocompletePxp = React.memo(
  (props) => <AutocompletePxpComponent {...props} />,
  areEqual,
);

export default AutocompletePxp;
