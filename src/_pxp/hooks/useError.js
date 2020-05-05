/**
 * Hook UseError for init in the object
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import { useState } from 'react';

const useError = () => {
  const [error, setError] = useState({ error: false, msg: '' });
  return {
    error,
    setError,
  };
};

export default useError;
