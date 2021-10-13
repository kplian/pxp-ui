/**
 * Hook initValues for inputs
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import { useEffect, useRef, useState } from 'react';
import useJsonStore from './useJsonStore';

const InitValues = (values, Pxp) => {
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
      case 'TimePicker':
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

  // listen if the value of autocomplete  is changed
  useEffect(() => {
    if (type === 'AutoComplete') {
      if (value != null) {
        setError({ hasError: false, msg: '' });
      }
    }
  }, [value]);

  // init useRef for some component
  const ref: any = useRef();

  const disable = () => setDisabled(true);
  const enable = () => setDisabled(false);
  const hide = () => setIsHide(true);
  const show = () => setIsHide(false);
  const reset = () => {
    switch (type) {
      case 'AutoComplete':
      case 'DatePicker':
      case 'TimePicker':
        setValue(null);
        break;
      case 'Switch':
        setValue(false);
        break;
      case 'DropzoneArea':
        setValue([]);
        break;
      case 'GoogleReCaptcha':
        if (ref.current && ref.current.reset()) setValue(null);
        break;
      default:
        setValue('');
        break;
    }
    setError({ hasError: false, msg: '' });
  };

  let config = {
    ...values,
    validate: { ...validate },
    ...{ value, setValue },
    ...{ error, setError },
    ...{ disabled, setDisabled },
    ...{ isHide, setIsHide },
    ...{ yupValidate, setYupValidate },
    ...(type === 'GoogleReCaptcha' && { ref }),

    hide,
    show,
    disable,
    enable,
    reset,
  };

  if (type === 'AutoComplete' && store) {
    config = {
      ...config,
      store: useJsonStore(store, Pxp),
    };
  }

  return config;
};

export default InitValues;
