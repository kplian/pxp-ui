/**
 * Hook UseError for init in the object
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 * @todo maybe rename to useError
 */
import { useState } from 'react';

const UseError = () => {
  const [error, setError] = useState({ error: false, msg: '' });
  return {
    error,
    setError,
  };
};

export default UseError;
