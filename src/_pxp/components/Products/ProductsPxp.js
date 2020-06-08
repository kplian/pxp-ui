import React from 'react';
import Products from './index';
import useJsonStore from '../../hooks/useJsonStore';

const params = {
    start: 0,
    limit: 50,
    dir: 'desc',
};

const ProductsPxp = ({ config, filters }) => {
    const jsonStore = useJsonStore({
        ...config.getDataTable
    });
    
    const { state, set, data, loading } = jsonStore;
    console.log('data', data);

    const pagination = {
        hasMore: true,
        parent: document.getElementById('content'),
        onLoadMore: (page) => {
          console.log('load me volvi a activar', page);
          handleLoadMore(page);
        },
    };

    const handleLoadMore = ( page ) => {
        set({
            ...state,
            params: {
              ...state.params,
              start: parseInt(page * state.params.limit, 10),
            },
            load: true,
            infinite: true,
        });
    }; 

    config.pagination = pagination;
    config.pagination.hasMore = data && data.total ? data.datos.length < parseInt(data.total) : true;
    
    // React.useEffect(() => {
        
    //     if( auxData && auxData.datos) {
    //         console.log('dataaaaaa', auxData);
    //         setData(auxData.datos);
    //     }
    // }, [auxData]);

    return (
        <div>
            <Products data={ data && data.datos ? data.datos: [] } filters={ filters } config={ config }/>
        </div>
    )
};

export default ProductsPxp;


