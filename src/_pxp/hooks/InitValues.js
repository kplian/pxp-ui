/**
 * Hook initValues for inputs
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import { useState } from 'react';
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

  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState({ hasError: false, msg: '' });
  const [disabled, setDisabled] = useState(isDisabled);
  const [hide, setHide] = useState(isHidden);

  let config = {
    ...values,
    validate: { ...validate },
    ...{ value, setValue },
    ...{ error, setError },
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
