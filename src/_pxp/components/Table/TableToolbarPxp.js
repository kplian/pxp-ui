import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import {lighten, fade, makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import FilterListIcon from "@material-ui/icons/FilterList";
import CheckListColumn from "./CheckListColumn";
import PropTypes from "prop-types";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
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
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
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
  const {numSelected, buttonsToolbar, buttonsToolbarBySelections, rowSelected, statesShowColumn, setStatesShowColumn, handleInputSearchChange} = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <>
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Table Name
          </Typography>
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
              onChange={(event) => handleInputSearchChange(event.target.value)}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          </Tooltip>

        </>

      )}

      {numSelected > 0 ? (
        <>
          {
            Object.entries(buttonsToolbarBySelections).map(([nameKey, values]) => {
              const B = values.button;

              return (
                <B key={`buttons_selections_${nameKey}`} handleClick={()=> values.onClick(rowSelected)}/>
              )
            })
          }

        </>
      ) : (
        <>
          {
            Object.entries(buttonsToolbar).map(([nameKey, values]) => {
              const B = values.button;
              return (
                <B key={`buttons_toolbar_${nameKey}`} handleClick={()=>values.onClick()}/>
              )
            })
          }

          {/*todo advanced search*/}
          {/*<Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon/>
            </IconButton>
          </Tooltip>*/}
          <CheckListColumn statesShowColumn={statesShowColumn} setStatesShowColumn={setStatesShowColumn}/>
        </>
      )}
    </Toolbar>
  );
};

export default TableToolbarPxp;

TableToolbarPxp.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
