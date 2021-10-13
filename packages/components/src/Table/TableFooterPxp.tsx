/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useState, FC } from 'react';
import TableFooter from '@mui/material/TableFooter';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import _ from 'lodash';

export declare interface TableFooterPxpProps {
  data: any,
  totals?: any;
  columns?: any;
  colSpan?: number,
  summary?: any,
  dataReader?: any
}

const TableFooterPxp: FC<TableFooterPxpProps> = ({
  data,
  totals = null,
  columns,
  colSpan = 1,
  summary = null,
  dataReader = {},
}) => {
  const sumTotals = _.sum(
    Object.keys(columns).map((key) => (columns[key].total ? 1 : 0)),
  );

  const cellColSpan = colSpan - sumTotals - 1;
  const sumColumn = (data = [], column) => {
    return _.round(
      _.sumBy(data, (item) => parseFloat(item[column])),
      2,
    );
  };

  return (
    <>
      {sumTotals > 0 && (
        <TableFooter>
          <TableRow>
            {colSpan > 1 && <TableCell rowSpan={3} colSpan={cellColSpan} />}
            {Object.keys(columns).map((key) => {
              const column = columns[key];
              if (column.total && column.total === 'sum') {
                return (
                  <>
                    <TableCell>
                      {columns[key].totalLabel
                        ? `${columns[key].totalLabel}(sub)`
                        : 'Sub Total'}
                    </TableCell>
                    <TableCell align="right">{sumColumn(data, key)}</TableCell>
                  </>
                );
              }
            })}
          </TableRow>
          {totals && (
            <TableRow>
              {Object.keys(columns).map((key) =>
                totals[key] ? (
                  <>
                    <TableCell>{columns[key].totalLabel || 'Total'}</TableCell>
                    <TableCell align="right">{totals[key]}</TableCell>
                  </>
                ) : (
                  ''
                ),
              )}
            </TableRow>
          )}
          {dataReader.isDetail && summary && (
            <TableRow>
              {Object.keys(summary).map((key) => (
                <>
                  <TableCell>{summary[key]?.label || 'Summary'}</TableCell>
                  <TableCell align="right">{summary[key]?.value}</TableCell>
                </>
              ))}
            </TableRow>
          )}
        </TableFooter>
      )}
    </>
  );
};

export default TableFooterPxp;
