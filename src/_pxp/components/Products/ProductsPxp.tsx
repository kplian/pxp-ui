import React, { FC } from 'react';
import Products from './index';
import useJsonStore from '../../hooks/useJsonStore';

const defaultParams = {
  start: 0,
  limit: 50,
  dir: 'desc',
};

const ProductsPxp: FC<any> = ({ config, filters }) => {
  const jsonStore = useJsonStore({
    ...config.getDataTable,
    params: { ...defaultParams, ...config.getDataTable.params },
  });

  const [myData, setMyData] = React.useState([]);
  const { state, set, data, loading, error } = jsonStore;
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
      if (page === 0) setMyData([]);
      if (filter) {
        handleLoadMore(page, filter);
      }
    },
  };

  config.pagination = pagination;
  config.pagination.hasMore =
    data && data.total ? data.datos.length < parseInt(data.total, 10) : true;

  React.useEffect(() => {
    if (data && data.datos.length >= 0 && !loading) {
      setMyData(data.datos);
    }
  }, [data]);

  return (
    <div>
      <Products
        data={myData}
        filters={filters}
        config={config}
        loading={loading}
        error={error}
        errorMessage={data?.detail?.message || null}
        pageLimit={config.getDataTable.params.limit}
      />
    </div>
  );
};

export default ProductsPxp;
