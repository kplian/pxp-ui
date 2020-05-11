/**
 * Component for rendering a table from config json for any pxp-ui project
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import RefreshIcon from '@material-ui/icons/Refresh';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import _ from 'lodash';
import connection from 'pxp-client';
import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import withWidth from '@material-ui/core/withWidth';
import TableToolbarPxp from './TableToolbarPxp';
import Form from '../Form/Form';
import DrawTable from './DrawTable';
import useJsonStore from '../../hooks/useJsonStore';

const ButtonRefresh = ({ handleClick }) => (
  <Tooltip title="new" aria-label="new">
    <IconButton aria-label="new" onClick={handleClick}>
      <RefreshIcon />
    </IconButton>
  </Tooltip>
);
const ButtonNew = ({ handleClick }) => (
  <Tooltip title="new" aria-label="new">
    <IconButton aria-label="new" onClick={handleClick}>
      <AddIcon />
    </IconButton>
  </Tooltip>
);
const ButtonEdit = ({ handleClick }) => (
  <Tooltip title="Edit" aria-label="edit">
    <IconButton aria-label="edit" onClick={handleClick}>
      <EditIcon />
    </IconButton>
  </Tooltip>
);
const ButtonDelete = ({ handleClick }) => (
  <Tooltip title="delete" aria-label="delete">
    <IconButton aria-label="delete" onClick={handleClick}>
      <DeleteIcon />
    </IconButton>
  </Tooltip>
);

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
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="up" ref={ref} {...props} />;
});

const TablePxp = ({ dataConfig, width }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const {
    idStore,
    buttonNew,
    buttonEdit,
    buttonDel,
    actionsTableCell,
  } = dataConfig;

  const { paginationType } = dataConfig;

  // toolbar
  const [selected, setSelected] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const [rowSelected, setRowSelected] = useState();

  const [statesShowColumn, setStatesShowColumn] = useState({});

  // get the menu that we will use in the table cell for each one.
  const jsonStore = useJsonStore(dataConfig.getDataTable);
  const { state, set, data, loading } = jsonStore;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.datos.map((n) => n[idStore]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleCheckInCell = (event, row) => {
    const selectedIndex = selected.indexOf(row[idStore]);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row[idStore]);
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

  useEffect(() => {
    const columnsForWidth = (nameKey, index) => {
      let jsonRes = {};
      console.log('width',width)
      switch (width) {
        case 'xs':
          jsonRes = {
            ...(width === 'xs' && index === 0
              ? { [nameKey]: true }
              : { [nameKey]: false }),
          };
          break;
        case 'sm':
          jsonRes = {
            ...(width === 'sm' && index < 3
              ? { [nameKey]: true }
              : { [nameKey]: false }),
          };
          break;
        case 'md':
          jsonRes = {
            ...(width === 'md' && index < 5
              ? { [nameKey]: true }
              : { [nameKey]: false }),
          };
          break;
        case 'lg':
          jsonRes = {
            ...(width === 'lg' && { [nameKey]: true }),
          };
          break;
        case 'xl':
          jsonRes = {
            ...(width === 'xl' && { [nameKey]: true }),
          };
          break;
        default:
          jsonRes = {};
      }
      return jsonRes;
    };
    // logic for show columns, create states for column.
    setStatesShowColumn(
      Object.entries(dataConfig.columns).reduce(
        (t, [nameKey], index) => ({
          ...t,
          ...columnsForWidth(nameKey, index),
        }),
        { checkbox_: false },
      ),
    );
  }, [width]);

  // init values pagination
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(
    parseInt(dataConfig.getDataTable.params.limit, 10),
  );

  // order
  const [order, setOrder] = React.useState(dataConfig.getDataTable.params.dir);
  const [orderBy, setOrderBy] = React.useState(
    dataConfig.getDataTable.params.sort,
  );

  // logic for new
  const [editMode, setEditMode] = React.useState(false);
  const [configFormState, setConfigFormState] = React.useState(dataConfig);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleRefresh = () => {
    set({
      ...state,
      ...(paginationType === 'infiniteScrolling' && {
        params: { ...state.params, start: 0 },
        infinite: false,
      }), // reset to start 0 when the pagination is scrolling
      refresh: true,
    });
  };

  const handleNew = () => {
    setEditMode(false);

    setConfigFormState({
      ...dataConfig,
      onSubmit: {
        ...dataConfig.onSubmit,
        callback: () => {
          handleRefresh();
        },
      },
    });
    setOpenDialog(true);
  };

  let dataConfigForEdit = { ...dataConfig };

  const handleEdit = (row) => {
    const columnsEdit = Object.entries(dataConfigForEdit.columns).reduce(
      (t, [nameKey, values]) => ({
        ...t,
        [nameKey]: { ...values, initialValue: row[nameKey] },
      }),
      {},
    );

    dataConfigForEdit = {
      ...dataConfigForEdit,
      columns: columnsEdit,
      submitLabel: 'Edit',
      onSubmit: {
        ...dataConfigForEdit.onSubmit,
        extraParams: {
          ...dataConfigForEdit.onSubmit.extraParams,
          [idStore]: row[idStore],
        },
        callback: () => {
          handleRefresh();
        },
      },
    };

    setConfigFormState(dataConfigForEdit);
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleDelete = (rowSelectedAux) => {
    // diff if is object or array
    // array is when the delete was executed with selections
    // object is when the delete was executed from actions menu

    let selectedAux = [];
    if (Array.isArray(rowSelectedAux)) {
      selectedAux = rowSelectedAux.slice();
    } else {
      selectedAux = selectedAux.concat([], rowSelectedAux[idStore]);
    }
    const sendDelete = selectedAux.reduce(
      (t, value, index) => ({
        ...t,
        [index]: { [idStore]: value, _fila: index + 1 },
      }),
      {},
    );

    connection
      .doRequest({
        url: dataConfig.urlDelete,
        params: {
          _tipo: 'matriz',
          row: JSON.stringify(sendDelete),
        },
      })
      .then((resp) => {
        if (!resp.error) {
          enqueueSnackbar('Success', {
            variant: 'success',
            action: <Button>See all</Button>,
          });
          handleRefresh();
        } else {
          enqueueSnackbar(resp.detail.message, {
            variant: 'error',
            action: <Button>See all</Button>,
          });
        }
      });
  };

  const buttonsToolbar = {
    ...(buttonNew && { buttonNew: { onClick: handleNew, button: ButtonNew } }),
    ...{ buttonRefresh: { onClick: handleRefresh, button: ButtonRefresh } },
  };

  const buttonsToolbarBySelections = {
    ...(buttonDel && {
      buttonDel: { onClick: handleDelete, button: ButtonDelete },
    }),
  };

  const buttonsTableCell = {
    ...(actionsTableCell.buttonEdit && {
      buttonEdit: {
        onClick: handleEdit,
        buttonIcon: <EditIcon />,
        label: 'Edit',
      },
    }),
    ...(actionsTableCell.buttonDel && {
      buttonDel: {
        onClick: handleDelete,
        buttonIcon: <DeleteIcon />,
        label: 'Delete',
      },
    }),
    ...actionsTableCell.extraButtons,
  };

  // pagination
  const handleChangePage = (event, newPage) => {
    set({
      ...state,
      params: {
        ...state.params,
        start: parseInt(rowsPerPage, 10) * parseInt(newPage, 10),
      },
    });
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
    set({
      ...state,
      params: { ...state.params, sort: property, dir: order, start: '0' },
      ...(paginationType === 'infiniteScrolling' && {
        params: { ...state.params, sort: property, dir: order, start: '0' },
        infinite: false,
      }),
    });
    setPage(0);
  };

  // this handle has debounce for start with searching after 500 ms in the table

  const columnsForSearch = Object.entries(dataConfig.columns)
    // eslint-disable-next-line no-unused-vars
    .filter(([nameKey, value]) => value.search === true)
    .reduce(
      (t, [nameKey, value]) => ({ ...t, [nameKey]: value.filters.pfiltro }),
      {},
    );

  const handleInputSearchChange = _.debounce(async (value) => {
    set({
      ...state,
      params: {
        ...state.params,
        ...(paginationType === 'infiniteScrolling' && { start: 0 }), // reset to start 0 when the pagination is scrolling
        bottom_filter_fields: Object.values(columnsForSearch).join(','),
        bottom_filter_value: value,
      },
      ...(paginationType === 'infiniteScrolling' && { infinite: false }),
    });
  }, 500);

  const handles = {
    handleSelectAllClick,
    handleCheckInCell,
    handleRequestSort,
    handleInputSearchChange,
  };

  const emptyRows = data
    ? rowsPerPage - Math.min(rowsPerPage, data.datos.total - page * rowsPerPage)
    : null;

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          dataConfig.paginationType === 'infiniteScrolling' &&
          data.datos.length < data.total
        ) {
          // jsonStore.set(prev => ({...prev, params:{ ...prev.params, start: parseInt(prev.params.start + 10)}, infinite:true}))
          jsonStore.set({
            ...state,
            params: {
              ...state.params,
              start: parseInt(state.params.start + 10, 10),
            },
            infinite: true,
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading],
  );

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <TableToolbarPxp
            numSelected={selected.length}
            buttonsToolbar={buttonsToolbar}
            buttonsToolbarBySelections={buttonsToolbarBySelections}
            rowSelected={selected}
            statesShowColumn={statesShowColumn}
            setStatesShowColumn={setStatesShowColumn}
            handleInputSearchChange={handleInputSearchChange}
          />
          {
            <DrawTable
              idStore={idStore}
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
              lastBookElementRef={lastBookElementRef}
            />
          }

          {data &&
            (paginationType === 'pagination' ||
              paginationType === undefined) && (
              <TablePagination
                rowsPerPageOptions={[
                  parseInt(dataConfig.getDataTable.params.limit, 10),
                ]}
                component="div"
                count={parseInt(data.total, 10)}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            )}
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </div>

      <Dialog
        fullScreen
        open={openDialog}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {editMode ? 'Edit' : 'Add'}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Form dialog data={configFormState} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default withWidth()(TablePxp);
