/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';
import Zoom from '@material-ui/core/Zoom';
import Item from './Item';
import BasicFilters from '../filters/BasicFilters';
import useObserver from '../../hooks/useObserver';
import EmptyData from '../EmptyData';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'auto',
    padding: 0,
    paddingBottom: theme.spacing(0),
  },

  item: {
    margin: '2px',
    // padding: theme.spacing(1),
    boxShadow: theme.shadows[8],
    maxWidth: '345px',
    borderRadius: '10px',
  },
  filters: {
    margin: '10px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backgroundColor: `${theme.palette.background.paper}e3`,
    boxShadow: theme.shadows[10],
  },
}));

const Loader = (props) => (
  <div
    id="loader"
    style={{
      padding: '10px',
      textAlign: 'center',
    }}
  >
    <CircularProgress />
  </div>
);

const Products = ({
  data = [],
  filters,
  config,
  loading = true,
  error = false,
  errorMessage = null,
  pageLimit = 50,
}) => {
  const classes = useStyles();
  const scrollRef = React.createRef();
  const [filter, setFilter] = useState(null);
  const [page, setPage] = useState(-1);
  const [observer, setElement, entry] = useObserver({
    threshold: 0.7,
    root: null,
    rootMargin: '10px',
  });

  const handleFilter = _.debounce((currentFilter, tab = false) => {
    if (tab) {
      // if the handle is active from tab then we need to return the page to 0
      // todo change this logic
      // setPage(0);
    }
    setFilter(currentFilter);
  }, 500);

  useEffect(() => {
    const loaderRef = document.getElementById('loader');
    setElement(loaderRef);
  }, [config.pagination.hasMore, data]);

  useEffect(() => {
    if (entry && entry.isIntersecting && config.pagination.hasMore) {
      setPage((prev) => prev + 1);
      // const element = entry.target;
      // observer.unobserve(element);
    }
  }, [entry]);

  useEffect(() => {
    if (page === 0) {
      scrollRef.current.scrollToTop(0);
      config.pagination.onLoadMore(page, filter);
    } else if (page > 0 && config.pagination.hasMore) {
      config.pagination.onLoadMore(page, filter);
    } else if (filter && filter.search) {
      config.pagination.onLoadMore(0, filter);
    }
  }, [page]);

  useEffect(() => {
    if (page === 0) {
      scrollRef.current.scrollToTop(0);
      config.pagination.onLoadMore(page, filter);
    } else {
      setPage(0);
    }
  }, [filter]);

  return (
    <Box
      component={Scrollbars}
      style={{ height: 'calc(var(--vh) - 56px)' }}
      ref={scrollRef}
    >
      <Box className={classes.filters}>
        <BasicFilters filters={filters} handleFilter={handleFilter} />
      </Box>
      <Box flexGrow={1} p={2} style={{ height: 'calc(100vh - 110px)' }}>
        {!loading && !error && data.length === 0 && <EmptyData />}
        {loading && page === 0 && <Loader />}
        {error && <label>{errorMessage || 'Ha acurrido un error...'}</label>}
        {!error && data.length > 0 && (
          <Grid container spacing={1} className={classes.root}>
            {data
              //   .filter( item => {
              //   if( filter ) {
              //     return valueFilter( item, filter);
              //   }
              //   return true;
              // })
              .map((item, i) => (
                <Grid
                  item
                  xs={6}
                  md={3}
                  lg={3}
                  xl={2}
                  key={`${item[config.idStore]}_${i}`}
                >
                  <Zoom
                    in
                    timeout={300}
                    style={{
                      transitionDelay: `${(i % pageLimit) * 100}ms`,
                    }}
                  >
                    <div className={classes.item}>
                      <Item item={item} config={config} />
                    </div>
                  </Zoom>
                </Grid>
              ))}
          </Grid>
        )}
        {data.length > 0 && config.pagination.hasMore && <Loader id="loader" />}
      </Box>
    </Box>
  );
};

export default Products;

// const valueFilter = ( item, filter ) => {
//   if( filter.field === '*') {
//     return allFilter( item, filter.value, filter.criteria );
//   } else {
//     switch( filter.criteria ) {
//       case 'equal' : return item[filter.field] === filter.value;
//       case 'greater' : return item[filter.field] > filter.value;
//       case 'less' : return item[filter.field] < filter.value;
//     }
//   }
// };

// const allFilter = ( item, value, criteria ) => {
//   let isValid = false;

//   Object.keys(item).filter( key => key !== 'urlImage').forEach( key => {
//     let aux;

//       switch( criteria ) {
//         case 'equal' : aux = value ? item[key] === value : true ; break;
//         case 'greater' : aux = value ? item[key] > value : true ; break;
//         case 'less' : aux = value ? item[key] < value : true ; break;
//         case 'contains' : aux = value ? item[key].toString().toLowerCase().includes( value.toString().toLowerCase()): true ; break;
//       };
//       isValid = isValid ? isValid : aux;
//   });
//   return isValid;
// };
