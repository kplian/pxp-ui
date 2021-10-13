/**
 * Component for rendering the header table from config json for any pxp-ui project
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */
import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableHead from '@mui/material/TableHead';

const TableHeadPxp = (props) => {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    statesShowColumn,
    headCells,
    hasActionsColumn,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* eslint-disable-next-line no-underscore-dangle */}
        {statesShowColumn.checkbox_ && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
        )}

        {Object.entries(headCells).map(([nameKey, vals]) => {
          const values: any = vals;
          return (
          <React.Fragment key={`tablecell_${nameKey}`}>
            {statesShowColumn[nameKey] && (
              <TableCell
                // align={props.headCells.numeric ? 'right' : 'left'}
                align="left"
                // padding={headCell.disablePadding ? 'none' : 'default'}
                padding="none"
                sortDirection={orderBy === nameKey ? order : false}
              >
                <TableSortLabel
                  active={orderBy === nameKey}
                  direction={orderBy === nameKey ? order : 'asc'}
                  onClick={createSortHandler(nameKey)}
                >
                  {values.label}
                  {orderBy === nameKey ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )}
          </React.Fragment>
        )}
        )}
        {hasActionsColumn.active && (
          <TableCell style={{ width: '5%' }} align="right">
            Actions
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadPxp;
