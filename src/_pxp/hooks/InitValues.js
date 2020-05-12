/**
 * Hook initValues for inputs
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import { useState } from 'react';
import useValue from './useValue';
import useError from './useError';
import useJsonStore from './useJsonStore';

const InitValues = (values) => {
  const {
    initialValue,
    validate,
    type,
    store,
    disabled: isDisabled = false,
    hide: isHidden = false,
  } = values;

  const [disabled, setDisabled] = useState(isDisabled);
  const [hide, setHide] = useState(isHidden);
  let config = {
    ...values,
    _value: useValue(initialValue),
    validate: { ...validate, error: useError() },
    ...{ disabled, setDisabled },
    ...{ hide, setHide },
  };

  if (type === 'AutoComplete' && store) {
    config = {
      ...config,
      // eslint-disable-next-line react-hooks/rules-of-hooks
      store: useJsonStore(store),
    };
  }

  return config;
};

export default InitValues;
