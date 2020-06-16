import React, { useState, useEffect } from 'react';
import {
  Tabs,
  Tab,
  Box,
  IconButton,
  Icon,
  InputBase,
  Grow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    // backgroundColor: theme.palette.primary.light
  },
  container: {
    width: 'calc( 100% - 48px)',
  },
  tabs: {
    // width: 'calc( 100% - 48px)',
  },
  input: {
    width: 'calc( 100% - 48px)',
    paddingLeft: '10px !important',
  },
}));

const BasicFilters = ({ filters, handleFilter }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState(false);
  const handleChange = (event, newValue) => setValue(newValue);

  const toggleSearch = () => {
    setSearch(!search);
  };

  const handleSearch = (e) => {
    let searchFitler = filters.filter((flr) => flr.search)[0] || null;
    searchFitler = { ...searchFitler, value: e.target.value };

    handleFilter(
      searchFitler || {
        field: '*',
        value: e.target.value,
        criteria: 'contains',
        search: true,
      },
    );
  };

  useEffect(() => {
    handleFilter(filters[value]);
  }, [value]);

  useEffect(() => {
    if (!search) {
      handleFilter(filters[value]);
      // inputSearch.value = '';
    }
  }, [search]);

  return (
    <Box className={classes.root}>
      {!search && (
        <Grow in={!search} timeout={700} className={classes.container}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="Filters"
            className={classes.tabs}
          >
            {filters
              .filter((filter) => !filter.search)
              .map((filter) => (
                <Tab key={filter.label} label={filter.label} />
              ))}
          </Tabs>
        </Grow>
      )}
      {search && (
        <Grow in={search} timeout={700} className={classes.input}>
          <InputBase
            className={classes.input}
            placeholder="Search"
            autoFocus
            inputProps={{ 'aria-label': 'search' }}
            onKeyUp={handleSearch}
          />
        </Grow>
      )}
      <IconButton onClick={toggleSearch}>
        <Icon>{!search ? 'search' : 'close'}</Icon>
      </IconButton>
    </Box>
  );
};

export default BasicFilters;
