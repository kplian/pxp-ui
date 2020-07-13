import React from 'react';
import Products from './index';
import useJsonStore from '../../hooks/useJsonStore';

const defaultParams = {
  start: 0,
  limit: 50,
  dir: 'desc',
};

const ProductsPxp = ({ config, filters }) => {
  const jsonStore = useJsonStore({
    ...config.getDataTable,
    params: { ...defaultParams, ...config.getDataTable.params },
  });

  const { state, set, data } = jsonStore;
  const handleLoadMore = (page, filter = null) => {
    const filterConfig = {
      sort: state.params.sort,
      limit: state.params.limit,
      start: state.params.start,
    };

    if (filter && filter.search === true) {
      filterConfig.bottom_filter_fields = [filter.field].join();
      filterConfig.bottom_filter_value = filter.value;
      filterConfig[filter.fieldFilter] = filter.valueFilter;
    } else if (filter) {
      filterConfig[filter.field] = filter.value;
    }

    set((prev) => {
      return {
        ...state,
        params: {
          ...config.getDataTable.params,
          ...filterConfig,
          start: parseInt(page * state.params.limit, 10),
        },
        load: true,
        infinite: page !== 0,
      };
    });
  };

  const pagination = {
    hasMore: true,
    pageInit: -1,
    parent: document.getElementById('content'),
    onLoadMore: (page, filter) => {
      if (filter) {
        handleLoadMore(page, filter);
      }
    },
  };

  config.pagination = pagination;
  config.pagination.hasMore =
    data && data.total ? data.datos.length < parseInt(data.total, 10) : true;

  // React.useEffect(() => {

  //     if( auxData && auxData.datos) {
  //         console.log('dataaaaaa', auxData);
  //         setData(auxData.datos);
  //     }
  // }, [auxData]);

  return (
    <div>
      <Products
        data={data && data.datos ? data.datos : []}
        filters={filters}
        config={config}
      />
    </div>
  );
};

export default ProductsPxp;
