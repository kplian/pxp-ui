/**
 * Component for rendering a table from config json for any pxp-ui project
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import _ from 'lodash';
import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import useTheme from '@material-ui/core/styles/useTheme';
import Pxp from '../../../Pxp';
import TableToolbarPxp from './TableToolbarPxp';
import Form from '../Form/Form';
import DrawTable from './DrawTable';
import useJsonStore from '../../hooks/useJsonStore';
import InitButton from '../../hooks/InitButton';
import { setTableState } from '../../actions/app';
import Confirm from '../Alert/Confirm';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import DescriptionIcon from '@material-ui/icons/Description';


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

function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}

const TablePxp = forwardRef(({ dataConfig }, ref) => {
  const isVersion2 = Pxp.apiClient.backendVersion === 'v2';
  const width = useWidth();
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    tableName,
    idStore,
    buttonNew,
    buttonPdf,  //  show btn pdf
    buttonXlsx, //   show btn xlsx
    buttonCheckList,
    buttonDel,
    actionsTableCell,
    buttonsToolbar: addButtonsToolbar,
    afterRefresh,
    dataReader, // this is for map the data for render and the total
  } = dataConfig;
  const columnsForDrawing = Object.entries(dataConfig.columns)
    .filter(([, value]) => value.grid === true || value.grid === undefined)
    .reduce(
      (t, [nameKey, value]) => ({
        ...t,
        [nameKey]: value,
      }),
      {},
    );
  const { paginationType } = dataConfig;

  // toolbar
  const [selected, setSelected] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const [rowSelected, setRowSelected] = useState();
  // state for open dialog for delete
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    dataRow: undefined,
  });

  const [statesShowColumn, setStatesShowColumn] = useState({});

  // get the menu that we will use in the table cell for each one.
  const jsonStore = useJsonStore(dataConfig.getDataTable);
  const { state, set, data, loading, error } = jsonStore;

  const [dataRows, setDataRows] = useState([]);
  const [total, setTotal] = useState(); // total is whole total in your query backend
  const [dataFooter, setDataFooter] = useState(); // data for use in the footer
  const [dataHeaderSection, setDataHeaderSection] = useState(); // data for use in the header section
  useEffect(() => {
    if (data) {
      if (dataReader && dataReader.dataRows) {
        setDataRows(data[dataReader.dataRows]);
      } else {
        // put the defaul for moment is pxp backend version 1
        setDataRows(data.datos);
      }
      if (dataReader && dataReader.total) {
        setTotal(data[dataReader.total]);
      } else {
        // put the defaul for moment is pxp backend version 1
        setTotal(data.total);
      }
      if (dataReader && dataReader.dataFooter) {
        setDataFooter(data[dataReader.dataFooter]);
      }
      if (dataReader && dataReader.dataHeaderSection) {
        setDataHeaderSection(data[dataReader.dataHeaderSection]);
      }
    }
  }, [data]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dataRows.map((n) => n[idStore]);
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
    if (afterRefresh && data) {
      afterRefresh(data);
    }
  }, [afterRefresh, data]);

  useEffect(() => {
    const columnsForWidth = (nameKey, index) => {
      let jsonRes = {};
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
      Object.entries(columnsForDrawing).reduce(
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

  /** function for export data */
  const fileExport = (type = 'pdf') => {
    const configTable = dataConfig.getDataTable;
    const params = JSON.stringify(configTable.params);
    const module = configTable.module;
    const entity = configTable.entity;
    const columns = JSON.stringify(Object.keys(dataConfig.columns).map(key => ({
      header: dataConfig.columns[key].label,
      dataKey: key
    })));
    const filename = dataConfig.nameForm;
    window.open(`${Pxp.apiClient.protocol}://${Pxp.apiClient.host}:${Pxp.apiClient.port}/${Pxp.apiClient.baseUrl}/${type}?params=${params}&module=${module}&entity=${entity}&columns=${columns}&filename=${filename}`);
  };

  const handleNew = () => {
    setEditMode(false);

    setConfigFormState({
      ...dataConfig,
      onSubmit: {
        ...dataConfig.onSubmit,
        ...(Pxp.apiClient.backendVersion === 'v2' && {
          url: dataConfig.onSubmit.urlAdd, method: 'POST'
        }),

        callback: () => {
          handleRefresh();
        },
      },
    });
    setOpenDialog(true);
  };

  const saveState = () => {
    dispatch(setTableState(location.pathname, state.params));
  };

  let dataConfigForEdit = { ...dataConfig };

  const handleEdit = (row) => {
    const columnsEdit = Object.entries(dataConfigForEdit.columns).reduce(
      (t, [nameKey, column]) => ({
        ...t,
        [nameKey]: {
          ...column,
          ...(column.type === 'AutoComplete' && {
            initialValue:
              row[column.store.idDD] !== ''
                ? {
                    [column.store.idDD]: row[column.store.idDD],
                    [column.store.descDD]: row[column.gridDisplayField],
                  }
                : row[column.store.idDD],
          }),
          ...(column.type !== 'AutoComplete' && { initialValue: row[nameKey] }),
        },
      }),
      {},
    );

    dataConfigForEdit = {
      ...dataConfigForEdit,
      columns: columnsEdit,
      submitLabel: 'Edit',
      onSubmit: {
        ...dataConfigForEdit.onSubmit,
        ...(Pxp.apiClient.backendVersion === 'v2' && {
          url: `${dataConfigForEdit.onSubmit.urlEdit}/${row[idStore]}`, method: 'PATCH'
        }),
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

  const handleConfirmDelete = (rowSelectedAux) => {
    setConfirmDelete({
      open: true,
      data: rowSelectedAux,
    });
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

    Pxp.apiClient
      .doRequest({
        url: dataConfig.urlDelete,
        ...(Pxp.apiClient.backendVersion === 'v2' && { method: 'DELETE', url: `${dataConfig.urlDelete}/${selectedAux.join()}` }),
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

  // button toolbar
  const buttonsToolbar = {
    /*** add buttons export PDF XLSX */
    ...(buttonPdf && isVersion2 && {
      buttonPdf: { onClick: () => fileExport(), icon: <PictureAsPdfIcon />, title: 'Export PDF' },
    }),
    ...(buttonXlsx && isVersion2 && {
      buttonXlsx: { onClick: () => fileExport('xlsx'), icon: <DescriptionIcon />, title: 'Export XLSX' },
    }),
    /**********************************/
    ...(buttonNew && {
      buttonNew: { onClick: handleNew, icon: <AddIcon />, title: 'new' },
    }),
    ...{
      buttonRefresh: {
        onClick: handleRefresh,
        icon: <RefreshIcon />,
        title: 'Refresh',
      },
    },
    ...addButtonsToolbar,
  };
  // init button with some value like state
  const statesButtonsToolbar = Object.entries(buttonsToolbar).reduce(
    (t, [nameButton, buttonValues]) => ({
      ...t,
      [nameButton]: {
        ...InitButton(buttonValues),
      },
    }),
    {},
  );
  const disableButtonsToolbar = () => {
    Object.values(statesButtonsToolbar).forEach((stateButton) => {
      stateButton.disable();
    });
  };
  const enableButtonsToolbar = () => {
    Object.values(statesButtonsToolbar).forEach((stateButton) => {
      stateButton.enable();
    });
  };
  // end buttons toolbar

  // button Toolbar when the row is selected
  const buttonsToolbarBySelections = {
    ...(buttonDel && {
      buttonDel: {
        onClick: handleConfirmDelete,
        icon: <DeleteIcon />,
        title: 'Delete',
      },
    }),
  };
  const statesButtonsToolbarBySelections = Object.entries(
    buttonsToolbarBySelections,
  ).reduce(
    (t, [nameButton, buttonValues]) => ({
      ...t,
      [nameButton]: {
        ...InitButton(buttonValues),
      },
    }),
    {},
  );
  // end button Toolbar when the row is selected

  // buttonTableCell
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
        onClick: handleConfirmDelete,
        buttonIcon: <DeleteIcon />,
        label: 'Delete',
      },
    }),
    ...actionsTableCell.extraButtons,
  };
  // init button with some value like state
  const statesButtonsTableCell = Object.entries(buttonsTableCell).reduce(
    (t, [nameButton, buttonValues]) => ({
      ...t,
      [nameButton]: {
        ...InitButton(buttonValues),
      },
    }),
    {},
  );
  // end buttonTableCell

  // listening event click in row
  const handleClickRow = (event, row) => {
    if (typeof dataConfig.onClickRow === 'function') {
      dataConfig.onClickRow({ row, statesButtonsTableCell });
    }
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
  const columnForSearchCount = Object.values(columnsForSearch).length;

  const handleInputSearchChange = _.debounce(async (value) => {
    set({
      ...state,
      params: {
        ...state.params,
        ...(paginationType === 'infiniteScrolling' && { start: 0 }), // reset to start 0 when the pagination is scrolling
        ...(Pxp.apiClient.backendVersion === 'v1' && {
          bottom_filter_fields: Object.values(columnsForSearch).join(','),
          bottom_filter_value: value,
        }),
        ...(Pxp.apiClient.backendVersion === 'v2' && {
          genericFilterFields: Object.values(columnsForSearch).join('#'),
          genericFilterValue: value,
        }),
      },
      ...(paginationType === 'infiniteScrolling' && { infinite: false }),
    });
  }, 500);

  const handles = {
    handleSelectAllClick,
    handleCheckInCell,
    handleClickRow,
    handleRequestSort,
    handleInputSearchChange,
  };

  const emptyRows =
    data && !data.error
      ? rowsPerPage -
        Math.min(rowsPerPage, dataRows.lenght - page * rowsPerPage)
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
          dataRows.length < total
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
    [loading, dataConfig, data, jsonStore, state],
  );

  if (ref !== null) {
    useImperativeHandle(ref, () => {
      return {
        jsonStore,
        handleRefresh,
        saveState,
        statesButtonsToolbar,
        disableButtonsToolbar,
        enableButtonsToolbar,
      };
    });
  }

  return (
    <>
      <div className={classes.root}>
        {dataConfig.headerSection && dataHeaderSection && (
          <>
            {dataConfig.headerSection(dataHeaderSection)}
          </>
        )}
        <Paper className={classes.paper}>

          <TableToolbarPxp
            tableName={tableName}
            numSelected={selected.length}
            buttonsToolbar={statesButtonsToolbar}
            buttonsToolbarBySelections={statesButtonsToolbarBySelections}
            rowSelected={selected}
            statesShowColumn={statesShowColumn}
            setStatesShowColumn={setStatesShowColumn}
            handleInputSearchChange={handleInputSearchChange}
            buttonCheckList={buttonCheckList}
            columnForSearchCount={columnForSearchCount}
            defaultFilterValue={
              dataConfig.getDataTable.params.bottom_filter_value || ''
            }
          />
          {
            <DrawTable
              idStore={idStore}
              dataConfig={dataConfig}
              data={data}
              emptyRows={emptyRows}
              dense={dense}
              handles={handles}
              order={order}
              orderBy={orderBy}
              buttonsTableCell={statesButtonsTableCell}
              statesShowColumn={statesShowColumn}
              selected={selected}
              loading={loading}
              jsonStore={jsonStore}
              lastBookElementRef={lastBookElementRef}
              dataRows={dataRows}
              dataFooter={dataFooter}
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
                count={parseInt(total, 10)}
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
      <Confirm
        openConfirm={confirmDelete.open}
        setOpenConfirm={setConfirmDelete}
        dialogContentText="¿Está seguro de eliminar el registro?"
        data={confirmDelete.data}
        onConfirm={handleDelete}
      />
    </>
  );
});

export default TablePxp;
