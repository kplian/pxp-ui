import { useState } from 'react';

const InitButton = (button) => {
  const { disabled: isDisabled = false } = button;

  const [disabled, setDisabled] = useState(isDisabled);
  const disable = () => setDisabled(true);
  const enable = () => setDisabled(false);
  const config = {
    ...button,
    ...{ disabled, setDisabled },
    disable,
    enable,
  };

  return config;
};

export default InitButton;
