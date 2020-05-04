/**
 * Component for rendering the body table from config json for any pxp-ui project
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */
import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableBody from '@material-ui/core/TableBody';
import MenuTableCell from './MenuTableCell';
import MenuItemTableCell from './MenuItemTableCell';

const TableBodyPxp = ({
  dataConfig,
  data,
  idStore,
  statesShowColumn,
  handleCheckInCell,
  buttonsTableCell,
  dense,
  emptyRows,
  selected,
  lastBookElementRef,
}) => {
  const { datos: rows } = data;
  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <TableBody>
      {rows.map((row, index) => {
        const isItemSelected = isSelected(row[idStore]);
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
          <TableRow
            key={`tableRow_${row[idStore]}`}
            hover
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            selected={isItemSelected}
            // ref={lastBookElementRef}
            {...(parseInt(rows.length, 10) === index + 1 && {
              ref: lastBookElementRef,
            })}
          >
            {/* eslint-disable-next-line no-underscore-dangle */}
            {statesShowColumn.checkbox_ && (
              <TableCell padding="checkbox">
                <Checkbox
                  key={`checkbox_${row[idStore]}`}
                  checked={isItemSelected}
                  inputProps={{ 'aria-labelledby': labelId }}
                  onClick={(event) => handleCheckInCell(event, row)}
                />
              </TableCell>
            )}
            {Object.entries(dataConfig.columns).map(
              ([nameKey, values], indexColumn) => {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <React.Fragment key={`cell_${indexColumn}_${nameKey}`}>
                    {statesShowColumn[nameKey] && (
                      <TableCell align="left">
                        {values.renderColumn
                          ? values.renderColumn(row)
                          : row[nameKey]}
                      </TableCell>
                    )}
                  </React.Fragment>
                );
              },
            )}

            <TableCell align="right">
              <MenuTableCell>
                <MenuItemTableCell buttons={buttonsTableCell} row={row} />
              </MenuTableCell>
            </TableCell>
          </TableRow>
        );
      })}

      {emptyRows > 0 && (
        <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};

export default TableBodyPxp;
