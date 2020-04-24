import React from 'react';
import { CircularProgress, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';


const areEqual = (prev, next) => (
  next.memoDisabled !== false &&
  prev.value === next.value &&
  prev.name === next.name &&
  prev.loading === next.loading &&
  prev.open === next.open)

const AutocompletePxpComponent = ({ name, value, configInput, handles, loading, states }) => {

  const { label, variant, store, isSearchable, gridForm} = configInput;

  return (
    <Grid key={`grid_${name}`} item {...gridForm}>
      <Autocomplete
        // key={index}
        id={name}
        onInputChange={(e) => handles.handleInputChange(e.target.value, isSearchable, store)}
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
          (store.data)
            ? store.data.datos.map((i) => ({ ...i, value: i[store.idDD], label: i[store.descDD] }))
            : [] // we need to send empty array for init form
        }
        loading={store.loading}
        renderInput={(params) => (
          <TextField
            {...params}

            label={label}
            variant={variant}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {store.loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        onChange={(event, newValue) => {
            handles.handleChange({
              event, name, value: (newValue) ? newValue[store.idDD] : '', data: newValue, configInputState:configInput, states
            });
          }}
        renderOption={(store.renderOption) ? (option) => store.renderOption(option) : null}
      />
    </Grid>

  );
};

//export default AutocompletePxp;



/**
 * A memoized component that will re-render only one of props described in areEqual change.
 */
const AutocompletePxp = React.memo(props => <AutocompletePxpComponent {...props} />, areEqual);

export default AutocompletePxp;
