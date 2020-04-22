import useValue from './useValue';
import useError from './useError';
import useJsonStore from './useJsonStore';

const InitValues = (values) => {
  const {
    initialValue, validate, type, store
  } = values;

  let config = {
    ...values,
    _value: useValue(initialValue),
    validate: { ...validate, error: useError() }

  };

  if (type === 'AutoComplete' && store) {
    config = {
      ...config,
      // eslint-disable-next-line react-hooks/rules-of-hooks
      store: useJsonStore(store)
    };
  }

  return config;
};

export default InitValues;
