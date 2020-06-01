/**
 * Hooks for listening the loading, errors and data while the useJsonStore is executed of for any pxp-ui project
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import { useState } from 'react';
import useFetch from './useFetch';

const useJsonStore = (optionsRequest) => {
  const [state, set] = useState({
    url: optionsRequest.url,
    params: optionsRequest.params,
    load: optionsRequest.load === undefined ? true : optionsRequest.load,
  });
  const [open, setOpen] = useState(false);
  const [data, loading, error] = useFetch(state);



  return {
    state,
    set,
    open,
    setOpen,
    data,
    loading,
    error,
    ...optionsRequest,
  };
};

export default useJsonStore;
