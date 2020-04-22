import { useState } from 'react';
import useFetch from './useFetch';

const UseJsonStore = (optionsRequest) => {
  const [state, set] = useState({ url: optionsRequest.url, params: optionsRequest.params });
  const [open, setOpen] = useState(false);
  const [data, loading, error] = useFetch(state);
  return {
    state, set, open, setOpen, data, loading, error, ...optionsRequest
  };
};

export default UseJsonStore;
