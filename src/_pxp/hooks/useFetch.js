/**
 * Hooks for getting data from hooks state of for any pxp-ui project
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */

import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import Pxp from '../../Pxp';

const useFetch = (options) => {
  const { enqueueSnackbar } = useSnackbar();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setError(null);
    const abortController = new AbortController();

    if (options !== undefined && options.load) {
      (async () => {
        // setLoading(true);
        const params = new URLSearchParams();
        // eslint-disable-next-line no-restricted-syntax
        for (const key in options) {
          params.append(key, options[key]);
        }
        setLoading(true);
        Pxp.apiClient
          .doRequest({
            url: options.url,
            params: options.params,
            method: options.method || 'POST',
          })
          .then((resp) => {
            setLoading(false);
            if (resp && isMounted) {
              if (resp.status >= 400 && resp.status < 600) {
                setError(resp);
              } else if (Pxp.config.backendVersion === 'v1') {
                if (!resp.error) {
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
                } else {
                  setData(resp); // send to error // todo change the logic for that
                }

                // send msg error
                if (resp.error) {
                  enqueueSnackbar(
                    <div>
                      url: ${options.url} -> ${resp.detail.message}
                      <pre
                        style={{
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-all',
                        }}
                      >
                        {JSON.stringify(resp.detail, null, 2)}
                      </pre>
                    </div>,
                    {
                      variant: 'error',
                      persist: false,
                    },
                  );
                }
                setError(resp.error);
              } else {
                // this is for node version v2
                if (options.infinite === true) {
                  setData((prevData) => {
                    if (prevData) {
                      return {
                        ...prevData,
                        data: prevData.data.concat(resp.data),
                      };
                    }
                    return resp;
                  });
                } else {
                  setData(resp);
                }

                if (resp.error) {
                  enqueueSnackbar(
                    <div>
                      url: ${options.url} -> ${resp.error.message}
                      <pre
                        style={{
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-all',
                        }}
                      >
                        {JSON.stringify(resp.error, null, 2)}
                      </pre>
                    </div>,
                    {
                      variant: 'error',
                      persist: false,
                    },
                  );
                }

              }
            }
          })
          .catch((err) => {
            // eslint-disable-next-line no-unused-expressions
            err.code !== 20 && setError(err);
            setLoading(false);
            enqueueSnackbar(
              <div>
                url: ${options.url} -> ${err.message}
                <pre
                  style={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                  }}
                >
                  {JSON.stringify(err, null, 2)}
                </pre>
              </div>,
              {
                variant: 'error',
                persist: false,
              },
            );
          });
      })();
    }

    const clean = () => {
      isMounted = false;
      abortController.abort();
    };
    return clean;
  }, [options, enqueueSnackbar]);

  return [data, setData, loading, error];
};

export default useFetch;
