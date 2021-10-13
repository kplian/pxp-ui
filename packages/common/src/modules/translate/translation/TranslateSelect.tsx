import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
}));

const TranslateSelect = ({ title, options = [], handleChange }) => {
  const classes = useStyles();
  const onChange = ({ target }) => {
    handleChange(target.value);
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="custom">{title}</InputLabel>
      <NativeSelect
        onChange={onChange}
        inputProps={{
          name: 'custom',
          id: 'translate-custom',
        }}
      >
        <option aria-label="None" value="" />
        {options.map((opt) => (
          <option key={`translate-id-${opt.value}`} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default TranslateSelect;
