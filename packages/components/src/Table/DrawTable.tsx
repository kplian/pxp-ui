/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/**
 * Component for rendering a table from config json for any pxp-ui project
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */
import React, { useEffect, useState, FC } from 'react';
import { makeStyles } from '@mui/styles';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import SkeletonLoading from './SkeletonLoading';
import TableBodyPxp from './TableBodyPxp';
import TableHeadPxp from './TableHeadPxp';
import TableFooterPxp from './TableFooterPxp';
import { Theme } from '@mui/material';

const useStyles: any = makeStyles((theme:Theme) => ({
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

export declare interface DrawTableProps {
  idStore?: any;
  dataConfig?: any;
  data?: any;
  emptyRows?: any;
  dense?: any;
  handles?: any;
  order?: any;
  orderBy?: any;
  buttonsTableCell?: any;
  statesShowColumn?: any;
  selected?: any;
  loading?: any;
  jsonStore?: any;
  lastBookElementRef?: any;
  dataRows?: any;
  dataFooter?: any;
}
const DrawTable: FC<DrawTableProps> = ({
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
  const [hasActionsColumn, setHasActionsColumn] = useState({
    active: false,
    type: '', // can be dropdown and click
  });

  const numColumnActives = Object.entries(statesShowColumn).filter(
    ([nameKey, values]) => {
      return values === true;
    },
  );

  // mount
  useEffect(() => {
    if (
      Object.entries(buttonsTableCell).length > 0 &&
      typeof dataConfig.actionsTableCell.onClick !== 'function'
    ) {
      setHasActionsColumn({
        active: true,
        type: 'dropDown',
      });
    } else if (typeof dataConfig.actionsTableCell.onClick === 'function') {
      setHasActionsColumn({
        active: true,
        type: 'click',
      });
    }
  }, []);

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
              hasActionsColumn={hasActionsColumn}
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
                lastBookElementRef={lastBookElementRef}
                dataRows={dataRows}
                hasActionsColumn={hasActionsColumn}
              />
              <TableFooterPxp
                colSpan={numColumnActives.length}
                columns={dataConfig.columns}
                data={dataRows}
                totals={
                  !dataConfig.dataReader.isDetail && data && data.totals
                    ? data.totals
                    : dataConfig.dataReader.isDetail &&
                      data &&
                      data.totalsDetail
                    ? data.totalsDetail
                    : null
                }
                summary={data && data.summaryData ? data.summaryData : null}
                dataReader={dataConfig.dataReader}
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
