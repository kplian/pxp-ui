/**
 * Component for rendering a table from config json for any pxp-ui project
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import SkeletonLoading from './SkeletonLoading';
import TableBodyPxp from './TableBodyPxp';
import TableHeadPxp from './TableHeadPxp';

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

const DrawTable = ({
  idStore,
  dataConfig,
  data,
  emptyRows,
  dense,
  handles,
  order,
  orderBy,
  buttonsTableCell,
  statesShowColumn,
  selected,
  loading,
  jsonStore,
  lastBookElementRef,
  dataRows,
  dataFooter,
}) => {
  const classes = useStyles();

  const { paginationType } = dataConfig;

  console.log(statesShowColumn);
  const numColumnActives = Object.entries(statesShowColumn).filter(
    ([nameKey, values]) => {
      console.log(values);
      if (values === true) {
        return values;
      }
    },
  );
  console.log(numColumnActives);

  console.log('dataConfig', dataConfig);
  return (
    <>
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
          aria-label="enhanced table"
        >
          {data && !data.error && (
            <TableHeadPxp
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handles.handleSelectAllClick}
              onRequestSort={handles.handleRequestSort}
              rowCount={dataRows.length}
              headCells={dataConfig.columns}
              statesShowColumn={statesShowColumn}
            />
          )}

          {((!loading &&
            (paginationType === 'pagination' ||
              paginationType === undefined)) ||
            (data && paginationType === 'infiniteScrolling')) && (
            <>
              <TableBodyPxp
                dataConfig={dataConfig}
                data={data}
                idStore={idStore}
                statesShowColumn={statesShowColumn}
                handleCheckInCell={handles.handleCheckInCell}
                handleClickRow={handles.handleClickRow}
                buttonsTableCell={buttonsTableCell}
                dense={dense}
                emptyRows={emptyRows}
                selected={selected}
                jsonStore={jsonStore}
                lastBookElementRef={lastBookElementRef}
                dataRows={dataRows}
              />
              {dataConfig.tableFooter && dataFooter && (
                <TableFooter>
                  <TableRow>
                    <TableCell
                      colSpan={numColumnActives.length + 1}
                      align="right"
                    >
                      {dataConfig.tableFooter(dataFooter)}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              )}
            </>
          )}

          {loading && (
            <SkeletonLoading
              columns={dataConfig.columns}
              statesShowColumn={statesShowColumn}
              rowsCount={dataConfig.getDataTable.params.limit}
            />
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export default DrawTable;
