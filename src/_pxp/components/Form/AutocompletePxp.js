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
import Pxp from '../../../Pxp';

const areEqual = (prev, next) =>
  next.memoDisabled !== false &&
  prev.value === next.value &&
  prev.name === next.name &&
  prev.loading === next.loading &&
  prev.open === next.open &&
  prev.disabled === next.disabled &&
  prev.error === next.error &&
  prev.dataStore === next.dataStore;

const AutocompletePxpComponent = ({
  name,
  value, // is used in areEqual
  configInput,
  handleChange,
  loading, // is used in areEqual
  disabled = false,
  helperText,
  error,
  msgError,
  size = 'medium',
  dataStore, // if the datastore changed we need to re-render
}) => {
  const { label, variant, store, isSearchable, gridForm } = configInput;
  const { dataRows } = store.dataReader; // this is the object that has the data for rendering


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
          ...(Pxp.apiClient.backendVersion === 'v1' && {
            par_filtro: store.parFilters,
            query: valueInput,
          }),
          ...(Pxp.apiClient.backendVersion === 'v2' && {
            genericFilterFields: store.parFilters,
            genericFilterValue: valueInput,
          }),
        },
      });
    }
  }, 500);

  const handleFocus = () => {
    if (store.state.load === false) {
      store.set((prevData) => ({
        ...prevData,
        load: true,
      }));
    }
  };

  return (
    <Grid key={`grid_${name}`} item {...gridForm}>
      <Autocomplete
        // key={index}
        id={name}
        size={size}
        filterSelectedOptions
        value={value}
        onInputChange={(e) =>
          handleInputChange(e && e.target.value, isSearchable, store)
        }
        open={store.open}
        onOpen={() => {
          store.setOpen(true);
        }}
        onClose={() => {
          store.setOpen(false);
        }}
        getOptionLabel={(option) => (option ? option[store.descDD] : ' ')}
        getOptionSelected={(optionEq, valueEq) => {
          if (
            // we need to put this for not generating error when the autocomplete tries to find the value in the option
            configInput.initialValue &&
            valueEq[store.idDD] === configInput.initialValue[store.idDD]
          ) {
            return true;
          }
          return valueEq && optionEq[store.idDD] === valueEq[store.idDD];
        }}
        options={
          dataStore
            ? dataStore[dataRows].map((i) => ({
                ...i,
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
              form: {
                autoComplete: 'off',
                autocomplete: 'chrome-off',
              },
              autocomplete: 'chrome-off',
              autoComplete: 'off',
              autoCorrect: 'off', // no standard, available only in safari
              endAdornment: (
                <>
                  {store.loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}

                  {configInput.InputProps &&
                    configInput.InputProps.endAdornment &&
                    configInput.InputProps.endAdornment}
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
          });
        }}
        onFocus={handleFocus}
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
