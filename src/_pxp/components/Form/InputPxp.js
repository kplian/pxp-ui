import React from 'react';
import InitValues from './../hooks/InitValues';

const InputPxp = (props) => {
  console.log('props', props);
  const { config, name } = props;
  const state = InitValues(config);
  console.log(state);

  const handleChange = (event, {_value}) => {
    _value.setValue(event.target.value);
  }
  return (
    <input key={name} value={state._value.value} onChange={(event) => {handleChange(event, state)}} />
  );
};

export default InputPxp;
