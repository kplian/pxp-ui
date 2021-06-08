import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import ListPxp from './ListPxp';
import Pxp from '../../../Pxp';

const ListPxpData = forwardRef((props, ref) => {
  const { config, FilterComponent, heightFilter, refresh, isRefreshActive = ()=>{} } = props;
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
      limit: 10,
      total: 9999,
    });
  };
  // Dynamic start value
  const initPage = config.showFilter ? -1 : 0;
  const [start, setStart] = useState(initPage);
  // Current value for search or filter
  const [value, setValue] = useState('');
  const [refreshActive, setRefreshActive] = useState(false);

  const infiniteScroll = {
    hasMore: configData.hasMore,
    parent: document.getElementById('content'),
    onLoadMore: (page) => {
      setStart(page * configData.limit);
    },
  };
  const onSearch = (filter = null, isRefresh = false) => {
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

    console.log('[STATES]', value, start, filter.value);
    if (start === -1) {
      setStart(0);
    } else if (value !== filter.value) {
      setValue(filter.value);
    } else {
      setRefreshActive(isRefresh);
      isRefreshActive(isRefresh);
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
        method: config.getDataTable.method || 'GET',
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

      setRefreshActive(false);
      isRefreshActive(false);

      const data = resp[config.dataReader.dataRows || 'datos'];
      const total = resp[config.dataReader.total || 'total'];
      if (resp && data) {
        data.forEach((item) => configData.data.push(item));

        const { length } = configData.data;
        const hasMore = !!(length < parseInt(total, 10) && total !== '0');

        setConfigData((prev) => {
          return {
            ...prev,
            total: parseInt(total, 10),
            hasMore,
            data: configData.start === 0 ? data : prev.data,
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
    if ((configData.hasMore && start >= 0) || refreshActive) {
      getData();
    }
  }, [start, value, refreshActive]);

  return (
    <ListPxp
      data={configData.data}
      config={config}
      FilterComponent={FilterComponent}
      heightFilter={heightFilter}
      refresh={refresh}
    />
  );
});

export default ListPxpData;
