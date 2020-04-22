import { useState, useEffect } from 'react';
import connection from "pxp-client";

const useFetch = (options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setError(null);
    const abortController = new AbortController();

    if (options !== undefined) {
      (async () => {
        setLoading(true);

        const params = new URLSearchParams();
        for (const key in options) {
          params.append(key, options[key]);
        }

        setLoading(true);

        const response = await fetch(
          connection.request({
            url: options.url,
            params: options.params
          })

        ).catch((err) => {
          err.code !== 20 && setError(err);
        });

        if (response && isMounted) {
          if (response.status >= 400 && response.status < 600) {
            setError(response);
          } else {
            setData(await response.json());
          }
        }
        setLoading(false);
      })();
    }

    const clean = () => {
      isMounted = false;
      abortController.abort();
    };
    return clean;
  }, [options]);

  return [data, loading, error];
};

export default useFetch;
