import React, { useState, useEffect } from 'react';
import {
  Tabs,
  Tab,
  Box,
  IconButton,
  Icon,
  InputBase,
  Input,
  Grow,
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
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

const BasicFilters = ({ filters, handleFilter, refresh = null }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState(false);
  const handleChange = (event, newValue) => setValue(newValue);

  const toggleSearch = () => {
    setSearch(!search);
  };

  const handleSearch = (e) => {
    let searchFitler = filters.find((flr) => flr.search) || null;
    const basicFilter = {
      field: '*',
      value: e.target.value,
      criteria: 'contains',
      search: true,
    };
    searchFitler = { ...basicFilter, ...searchFitler, value: e.target.value };

    const currentFilter = filters[value];

    handleFilter({
      fieldFilter: currentFilter.field,
      valueFilter: currentFilter.value,
      ...searchFitler,
    });
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
          {/* <InputBase */}
          <Input
            className={classes.input}
            placeholder="Search"
            autoFocus
            inputProps={{
              'aria-label': 'search',
              spellCheck: 'false',
              autoComplete: 'off',
              autoCorrect: 'off', // no standard, available only in safari
            }}
            onKeyUp={handleSearch}
          />
        </Grow>
      )}
      {refresh && (
        <IconButton onClick={() => handleFilter(filters[value], true)}>
          <RefreshIcon />
        </IconButton>
      )}
      <IconButton onClick={toggleSearch}>
        <Icon>{!search ? 'search' : 'close'}</Icon>
      </IconButton>
    </Box>
  );
};

export default BasicFilters;
