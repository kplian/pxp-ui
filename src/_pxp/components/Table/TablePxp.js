/**
 * Component for rendering a table from config json for any pxp-ui project
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */

import React, {useCallback, useRef, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {makeStyles} from "@material-ui/core/styles";
import useJsonStore from "./../../hooks/useJsonStore";
import DrawTable from "./DrawTable";
import RefreshIcon from "@material-ui/icons/Refresh";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Form from "../Form/Form";
import DialogContent from "@material-ui/core/DialogContent";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from '@material-ui/icons/Close';
import Slide from "@material-ui/core/Slide";
import _ from 'lodash';
import connection from "pxp-client";
import {Button} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import TableToolbarPxp from "./TableToolbarPxp";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


const ButtonRefresh = ({handleClick}) => (
  <Tooltip title="new" aria-label="new">
    <IconButton  aria-label="new" onClick={handleClick}>
      <RefreshIcon/>
    </IconButton>
  </Tooltip>
)
const ButtonNew = ({handleClick}) => (
  <Tooltip title="new" aria-label="new">
    <IconButton  aria-label="new" onClick={handleClick}>
      <AddIcon/>
    </IconButton>
  </Tooltip>
)
const ButtonEdit = ({handleClick}) => (
  <Tooltip title="Edit" aria-label="edit">
    <IconButton  aria-label="edit" onClick={handleClick}>
      <EditIcon/>
    </IconButton>
  </Tooltip>
)
const ButtonDelete = ({handleClick}) => (
  <Tooltip title="delete" aria-label="delete">
    <IconButton  aria-label="delete" onClick={handleClick}>
      <DeleteIcon/>
    </IconButton>
  </Tooltip>
)



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },


  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },

}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TablePxp = (props) => {
  const classes = useStyles();
  const { dataConfig } = props;


  //toolbar
  const [selected, setSelected] = React.useState([]);
  const [rowSelected, setRowSelected] = useState();

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.datos.map((n) => n[id_store]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleCheckInCell = (event, row) => {

    const selectedIndex = selected.indexOf(row[id_store]);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row[id_store]);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);

    setRowSelected(row);

  };



  //logic for show columns, create states for column.
  const [statesShowColumn, setStatesShowColumn] = useState(Object.entries(dataConfig.columns).reduce((t, [nameKey]) => (
    { ...t, [nameKey]: true }
  ), { checkbox_:false }));






  //init values pagination
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(parseInt(dataConfig.getDataTable.params.limit));


  // order
  const [order, setOrder] = React.useState(dataConfig.getDataTable.params.dir);
  const [orderBy, setOrderBy] = React.useState(dataConfig.getDataTable.params.sort);

  //init columns for the table

  const {id_store, buttonNew, buttonEdit, buttonDel} = dataConfig;
  const columns = Object.entries(dataConfig.columns).reduce((t, [nameKey, values]) => (
    { ...t, [nameKey]: {label: values.label} }
  ), {});


  //logic for new
  const [editMode, setEditMode] = React.useState(false);
  const [configFormState, setConfigFormState] = React.useState(dataConfig);
  const [openDialog, setOpenDialog] = React.useState(false);



  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleRefresh = () => {
    set({...state, refresh:true});
  };


  const handleNew = () => {
    setEditMode(false);

    setConfigFormState({
      ...dataConfig,
      onSubmit: {
        ...dataConfig.onSubmit,
        callback: () => {
          set({...state, refresh:true});
        }
      }
    });
    setOpenDialog(true);

  }

  let dataConfigForEdit = {...dataConfig};

  const handleEdit = (row) => {


    const columnsEdit = Object.entries(dataConfigForEdit.columns).reduce((t, [nameKey, values]) => (
      { ...t, [nameKey]: { ...values, initialValue: row[nameKey]} }
    ), {});

    dataConfigForEdit = {
      ...dataConfigForEdit,
      columns: columnsEdit,
      submitLabel: 'Edit',
      onSubmit: {
        ...dataConfigForEdit.onSubmit,
        extraParams: {...dataConfigForEdit.onSubmit.extraParams, [id_store]: row[id_store]},
        callback: () => {
          handleRefresh();
        }
      }
    }


    setConfigFormState(dataConfigForEdit);
    setEditMode(true);
    setOpenDialog(true);

  }


  const handleDelete = (rowSelected) => {
    //diff if is object or array
    //array is when the delete was executed with selections
    //object is when the delete was executed from actions menu

    let selected = [];
    if (Array.isArray(rowSelected)) {
      selected =  rowSelected.slice();
    } else {
      selected = selected.concat([], rowSelected[id_store]);
    }
    const sendDelete = selected.reduce((t, value, index) => (
      {...t, [index]: { [id_store]: value, _fila: index+1}}
    ), {});

    connection.doRequest({
      url: dataConfig.urlDelete,
      params: {
        _tipo:'matriz',
        row: JSON.stringify(sendDelete)
      }
    }).then(resp => {
      if(!resp.error) {
        handleRefresh();
      } else {

      }

    });


  }

  const buttonsToolbar = {
    ...(buttonNew && { buttonNew: { onClick:handleNew  , button: ButtonNew } }),
    ...{ buttonRefresh: { onClick:handleRefresh  , button: ButtonRefresh }},
    };

  const buttonsToolbarBySelections = {
    ...(buttonDel && { buttonDel: { onClick:handleDelete  , button: ButtonDelete } }),
  }

  const buttonsTableCell = {
    ...(buttonEdit && { buttonEdit: { onClick:handleEdit  , buttonIcon: ButtonEdit, label:'Edit' } }),
    ...(buttonDel && { buttonDel: { onClick:handleDelete  , buttonIcon: ButtonDelete, label:'Delete' } }),
  }

  // get the menu that we will use in the table cell for each one.




  const jsonStore = useJsonStore(dataConfig.getDataTable);
  const {state, set, open, setOpen, data , loading, error} = jsonStore;



  //pagination

  const handleChangePage = (event, newPage) => {
    set({ ...state, params: {...state.params, start: parseInt(rowsPerPage) * parseInt(newPage)} });
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };


  const handleRequestSort = (event, property) => {

    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    set({ ...state, params: {...state.params, sort: property ,dir: order, start:'0'} });
    setPage(0);



  };

  /*
  * "bottom_filter_fields":"nombre,p.apellido_paterno,p.apellido_materno,p.direccion","bottom_filter_value":"fav"
  * */
  // this handle has debounce for start with searching after 500 ms in the table

  const columnsForSearch = Object.entries(dataConfig.columns).filter(([nameKey, value]) => value.search === true).reduce((t, [nameKey, value]) => (
    { ...t, [nameKey]: value.filters.pfiltro }
  ), {});

  const handleInputSearchChange = _.debounce(async (value) => {
    set({
      ...state, params: { ...state.params, bottom_filter_fields: Object.values(columnsForSearch).join(','), bottom_filter_value: value }
    })
  }, 500);


  const handles = {handleSelectAllClick, handleCheckInCell, handleRequestSort, handleInputSearchChange};

  const emptyRows = (data) ? rowsPerPage - Math.min(rowsPerPage, data.datos.total - page * rowsPerPage) : null;




  return (
    <>
      <div className={classes.root}>



        <Paper className={classes.paper}>
          <TableToolbarPxp numSelected={selected.length}
                           buttonsToolbar={buttonsToolbar}
                           buttonsToolbarBySelections={buttonsToolbarBySelections}
                           rowSelected={selected}
                           statesShowColumn={statesShowColumn}
                           setStatesShowColumn={setStatesShowColumn}
                           handleInputSearchChange={handleInputSearchChange}
          />
          {
            <DrawTable        id_store={id_store}
                               dataConfig={dataConfig}
                              data={data}
                               buttonsToolbar={buttonsToolbar}
                               buttonsToolbarBySelections={buttonsToolbarBySelections}
                               emptyRows={emptyRows}
                               dense={dense}
                               handles={handles}
                               order={order}
                               orderBy={orderBy}
                               buttonsTableCell={buttonsTableCell}
                               statesShowColumn={statesShowColumn}
                               selected={selected}
                              loading={loading}
                              jsonStore={jsonStore}
            />

          }

          {(data && !!dataConfig.infiniteScrolling === false) && <TablePagination
            rowsPerPageOptions={[parseInt(dataConfig.getDataTable.params.limit)]}
            component="div"
            count={parseInt(data.total)}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />}



        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense}/>}
          label="Dense padding"
        />


      </div>


      <Dialog fullScreen open={openDialog} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {editMode ? 'Edit' : 'Add'}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Form dialog={true} data={configFormState}/>

        </DialogContent>
      </Dialog>


    </>
  );
};

export default TablePxp;
