import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TableToolbarPxp from "./TableToolbarPxp";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHeadPxp from "./TableHeadPxp";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableBody from "@material-ui/core/TableBody";
import MenuTableCell from "./MenuTableCell";
import MenuItemTableCell from "./MenuItemTableCell";
import Skeleton from "@material-ui/lab/Skeleton";
import TableBodyPxp from "./TableBodyPxp";
import SkeletonLoading from "./SkeletonLoading";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 350,
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
}));

const DrawTable = ({id_store, dataConfig, data,
                     buttonsToolbar, buttonsToolbarBySelections, emptyRows, dense,
                     handles, order, orderBy,
                     buttonsTableCell,statesShowColumn,
                     selected,
                     loading,
                     jsonStore
                   }) => {



  const classes = useStyles();




  return (
      <>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
            stickyHeader
          >
            {data && <TableHeadPxp
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handles.handleSelectAllClick}
              onRequestSort={handles.handleRequestSort}
              rowCount={data.datos.length}
              headCells={dataConfig.columns}
              statesShowColumn={statesShowColumn}
            />}

            {(!loading) && <TableBodyPxp
              dataConfig={dataConfig}
              data={data}
              id_store={id_store}
              statesShowColumn={statesShowColumn}
              handleCheckInCell={handles.handleCheckInCell}
              buttonsTableCell={buttonsTableCell}
              dense={dense}
              emptyRows={emptyRows}
              selected={selected}
              jsonStore={jsonStore}
            />}

            {(loading) && <SkeletonLoading columns={dataConfig.columns} statesShowColumn={statesShowColumn} rowsCount={dataConfig.getDataTable.params.limit}/>}


          </Table>
        </TableContainer>
</>
  );

};

export default DrawTable;
