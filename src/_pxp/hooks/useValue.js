/**
 * Hook useValue for init in the object
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 * @todo maybe rename to useValue
 */
import { useState } from 'react';

const UseValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    setValue,
  };
};

export default UseValue;
