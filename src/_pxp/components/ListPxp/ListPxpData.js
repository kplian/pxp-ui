import React, { useState, useEffect } from 'react';
import ListPxp from './ListPxp';
import Pxp from '../../../Pxp';

const ListPxpData = ({ config }) => {
  const [configData, setConfigData] = useState({
    data: [],
    hasMore: true,
    limit: 12,
    total: 9999,
  });
  // Dynamic start value
  const [start, setStart] = useState(0);
  // Current value for search or filter
  const [value, setValue] = useState('');

  const infiniteScroll = {
    hasMore: configData.hasMore,
    parent: document.getElementById('content'),
    onLoadMore: (page) => {
      setStart(page * configData.limit);
    },
  };
  const onSearch = (value) => {
    setConfigData((prev) => ({
      ...prev,
      total: 9999,
      hasMore: true,
      data: [],
      bottom_filter_value: value,
    }));

    setStart(0);
    setValue(value);
  };

  config.infiniteScroll = infiniteScroll;
  config.onSearch = onSearch;

  const params = config.getDataTable.params || {};
  // Call service with load data
  const getData = async () => {
    if (configData.total > configData.data.length) {
      const resp = await Pxp.apiClient.doRequest({
        url: config.getDataTable.url,
        params: {
          start,
          limit: params.limit || 50,
          sort: params.sort || '',
          dir: params.dir || 'ASC',
          contenedor: params.contenedor,
          bottom_filter_fields: params.bottom_filter_fields || '',
          bottom_filter_value: value,
        },
      });

      if (resp && resp.datos) {
        resp.datos.forEach((item) => configData.data.push(item));

        const {length} = configData.data;
        const hasMore =
          !!(length < parseInt(resp.total) && resp.total !== '0');

        setConfigData((prev) => {
          return {
            ...prev,
            total: parseInt(resp.total),
            hasMore,
            data: configData.start === 0 ? resp.datos : prev.data,
          };
        });
      }
    } else {
      setConfigData((prev) => ({
        ...prev,
        hasMore: false,
      }));
    }
  };

  // active with change page or value search
  useEffect(() => {
    if (configData.hasMore) {
      getData();
    }
  }, [start, value]);

  return <ListPxp data={configData.data} config={config} />;
};

export default ListPxpData;
