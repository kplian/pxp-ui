/**
 * Component for rendering toolbar for the table from config json for any pxp-ui project
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */

import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CheckListColumn from './CheckListColumn';
import ButtonPxp from '../ButtonPxp';
import { Theme, alpha, lighten } from '@mui/material';



const useToolbarStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.mode === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const TableToolbarPxp = (props) => {
  const classes = useToolbarStyles();
  const {
    tableLabel,
    numSelected,
    buttonsToolbar,
    buttonsToolbarBySelections,
    rowSelected,
    statesShowColumn,
    setStatesShowColumn,
    handleInputSearchChange,
    buttonCheckList,
    columnForSearchCount,
    defaultFilterValue,
    dataConfig,
  } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <>
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {tableLabel && tableLabel}
          </Typography>
          {columnForSearchCount > 0 && (
            <Tooltip title="This filter only applies for columns: ">
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  onChange={(event) =>
                    handleInputSearchChange(event.target.value)
                  }
                  defaultValue={defaultFilterValue}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
            </Tooltip>
          )}
        </>
      )}

      {numSelected > 0 ? (
        <>
          {Object.entries(buttonsToolbarBySelections).map(
            ([nameKey, vals]) => {
              const values: any = vals;
              return (
                <ButtonPxp
                  key={nameKey}
                  title={values.title}
                  icon={values.icon}
                  onClick={() => values.onClick(rowSelected)}
                  disabled={values.disabled}
                />
              );
            },
          )}
        </>
      ) : (
        <>
          {Object.entries(buttonsToolbar).map(([nameKey, vals]) => {
            const values: any = vals;
            return (
              <ButtonPxp
                key={nameKey}
                title={values.title}
                icon={values.icon}
                onClick={() => values.onClick()}
                disabled={values.disabled}
              />
            );
          })}

          {/* todo advanced search */}
          {/* <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon/>
            </IconButton>
          </Tooltip> */}
          {(buttonCheckList === true || buttonCheckList === undefined) && (
            <CheckListColumn
              statesShowColumn={statesShowColumn}
              setStatesShowColumn={setStatesShowColumn}
              dataConfig={dataConfig}
            />
          )}
        </>
      )}
    </Toolbar>
  );
};

export default TableToolbarPxp;
