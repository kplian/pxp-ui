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

  // init value for type because some types has error when we put null or blank
  // textField and dropdown need to have blank if it is null
  // AutoComplete and DatePicker need to have null if it is blank
  let valueField = initialValue;
  if (!initialValue) {
    switch (type) {
      case 'AutoComplete':
      case 'DatePicker':
        valueField = null;
        break;
      case 'Switch':
        valueField = false;
        break;
      case 'DropzoneArea':
        valueField = [];
        break;
      default:
        valueField = '';
        break;
    }
  }

  const [value, setValue] = useState(valueField);
  const [error, setError] = useState({ hasError: false, msg: '' });
  const [disabled, setDisabled] = useState(isDisabled);
  const [isHide, setIsHide] = useState(isHidden);
  const [yupValidate, setYupValidate] = useState(validate);

  const disable = () => setDisabled(true);
  const enable = () => setDisabled(false);
  const hide = () => setIsHide(true);
  const show = () => setIsHide(false);
  const reset = () => {
    switch (type) {
      case 'AutoComplete':
      case 'DatePicker':
        setValue(null);
        break;
      case 'Switch':
        setValue(false);
        break;
      case 'DropzoneArea':
        setValue([]);
        break;
      default:
        setValue('');
        break;
    }
  };
  let config = {
    ...values,
    validate: { ...validate },
    ...{ value, setValue },
    ...{ error, setError },
    ...{ disabled, setDisabled },
    ...{ isHide, setIsHide },
    ...{ yupValidate, setYupValidate },
    hide,
    show,
    disable,
    enable,
    reset,
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
