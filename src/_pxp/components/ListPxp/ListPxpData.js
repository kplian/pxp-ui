import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import ListPxp from './ListPxp';
import Pxp from '../../../Pxp';

const ListPxpData = forwardRef((props, ref) => {
  const { config, FilterComponent, heightFilter } = props;
  const [configData, setConfigData] = useState({
    data: [],
    hasMore: true,
    limit: 12,
    total: 9999,
  });

  const resetConfig = () => {
    setConfigData({
      data: [],
      hasMore: true,
      limit: 12,
      total: 9999,
    });
  };
  // Dynamic start value
  const initPage = config.showFilter ? -1 : 0;
  const [start, setStart] = useState(initPage);
  // Current value for search or filter
  const [value, setValue] = useState('');

  const infiniteScroll = {
    hasMore: configData.hasMore,
    parent: document.getElementById('content'),
    onLoadMore: (page) => {
      setStart(page * configData.limit);
    },
  };
  const onSearch = (filter = null) => {
    console.log('[SEARCH]', filter);
    const filterConfig = {};
    if (filter && filter.search === true) {
      filterConfig.bottom_filter_fields = [filter.field].join();
      filterConfig.bottom_filter_value = filter.value;
    } else if (filter) {
      filterConfig[filter.field] = filter.value;
    }
    setConfigData((prev) => ({
      ...prev,
      total: 9999,
      hasMore: true,
      data: [],
      filter: filterConfig,
    }));

    if (start === -1) {
      setStart(0);
    } else {
      setValue(filter.value);
    }
  };

  config.infiniteScroll = infiniteScroll;
  config.onSearch = onSearch;

  const params = config.getDataTable.params || {};
  // Call service with load data
  const getData = async () => {
    console.log('[RESP]', configData);

    if (configData.total > configData.data.length) {
      const resp = await Pxp.apiClient.doRequest({
        url: config.getDataTable.url,
        params: {
          // ...params,
          start,
          limit: params.limit || 50,
          sort: params.sort || '',
          dir: params.dir || 'ASC',
          contenedor: params.contenedor || '',
          ...configData.filter,
          // bottom_filter_fields: params.bottom_filter_fields || '',
          // bottom_filter_value: value,
        },
      });

      console.log('[RESP]', resp);
      if (resp && resp.datos) {
        resp.datos.forEach((item) => configData.data.push(item));

        const { length } = configData.data;
        const hasMore = !!(length < parseInt(resp.total) && resp.total !== '0');

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

  useImperativeHandle(ref, () => {
    return {
      getData,
      resetConfig,
    };
  });
  // active with change page or value search
  useEffect(() => {
    if (configData.hasMore && start >= 0) {
      getData();
    }
  }, [start, value]);

  return (
    <ListPxp
      data={configData.data}
      config={config}
      FilterComponent={FilterComponent}
      heightFilter={heightFilter}
    />
  );
});

export default ListPxpData;
