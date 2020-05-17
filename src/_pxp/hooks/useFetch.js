/**
 * Hooks for getting data from hooks state of for any pxp-ui project
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */

import { useState, useEffect } from 'react';
import connection from 'pxp-client';

const useFetch = (options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setError(null);
    const abortController = new AbortController();

    if (options !== undefined && options.load) {
      (async () => {
        setLoading(true);

        const params = new URLSearchParams();
        // eslint-disable-next-line guard-for-in
        for (const key in options) {
          params.append(key, options[key]);
        }

        setLoading(true);

        connection
          .doRequest({
            url: options.url,
            params: options.params,
          })
          .then((resp) => {
            if (resp && isMounted) {
              if (resp.status >= 400 && resp.status < 600) {
                setError(resp);
              } else {
                // setData(resp);
                if (options.infinite === true) {
                  setData((prevData) => {
                    if (prevData) {
                      return {
                        ...prevData,
                        datos: prevData.datos.concat(resp.datos),
                      };
                    }
                    return resp;
                  });
                } else {
                  setData(resp);
                }

                setLoading(false);
              }
            }
          })
          .catch((err) => {
            // eslint-disable-next-line no-unused-expressions
            err.code !== 20 && setError(err);
          });
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
