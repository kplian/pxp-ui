import { useState } from 'react';

const UseError = () => {
  const [error, setError] = useState({ error: false, msg: '' });
  return {
    error,
    setError,
  };
};

export default UseError;
