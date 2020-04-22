import InitValues from './InitValues';

const initFormPxp = ({ config} ) => {

  const state = Object.entries(config.columns).reduce((t, [nameKey, value]) => (
    { ...t, [nameKey]: InitValues(value) }
  ), {});

  const configState = {
    ...config, columns: state
  }

  return configState;
};

export default initFormPxp;
