import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Box } from '@material-ui/core';
import Item from './Item';
import BasicFilters from './BasicFilters';
import useObserver from '../../hooks/useObserver';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'auto',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },

  item: {
    margin: theme.spacing(1),
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
    backgroundColor: theme.palette.background.paper + 'e3',
    boxShadow: theme.shadows[10],
  }
}));

const Loader = (props) => (
  <div id="loader"
    style={{
      padding: '10px',
      textAlign: 'center'
    }}
  >
    <CircularProgress />
  </div>
);

const Products = ({ data = [], filters, config }) => {
  const classes = useStyles();
  const [ filter, setFilter ] = useState(null);
  const [ page, setPage ]     = useState( -1 );
  const [ observer, setElement, entry ] = useObserver({
    threshold: 0.9,
    root: null,
    rootMargin: '10px'
  });
  
  const handleFilter = _.debounce((currentFilter) => {
    setFilter( currentFilter );
  }, 500);

  useEffect(() => {
    const loaderRef = document.getElementById('loader');
    setElement(loaderRef);
  }, [config.pagination.hasMore]);

  useEffect(() => {
    if (entry && entry.isIntersecting && config.pagination.hasMore) {
      setPage( prev => prev + 1);

      // const element = entry.target;
      // observer.unobserve(element);
    }
  }, [entry]);

  useEffect(() => {
    if( page >= 0 && config.pagination.hasMore ) {
      config.pagination.onLoadMore(page, filter);
    } 
  }, [page]);

  useEffect(() => {
    if( page === 0 ) {
      config.pagination.onLoadMore(page, filter);
    } else {
      setPage(0);
    }
  }, [filter]);

  return (
    <Box>
      <Box className={ classes.filters }>
        <BasicFilters filters={filters} handleFilter={ handleFilter }/>
      </Box>
      <Grid container spacing={2} className={classes.root} >
        
            { data
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
                key={i} 
              >
                <div className={classes.item}>
                  <Item item={item} config={ config }/>
                </div>
              </Grid>
            ))}
      </Grid>
      { config.pagination.hasMore && <Loader id="loader"/>}
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