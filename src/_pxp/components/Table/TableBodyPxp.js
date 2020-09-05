/**
 * Component for rendering the body table from config json for any pxp-ui project
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */
import React from 'react';
import moment from 'moment';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableBody from '@material-ui/core/TableBody';
import MenuTableCell from './MenuTableCell';
import ButtonPxp from '../ButtonPxp';
import config from '../../../config';

const TableBodyPxp = ({
  dataConfig,
  data,
  idStore,
  statesShowColumn,
  handleCheckInCell,
  handleClickRow,
  buttonsTableCell,
  dense,
  emptyRows,
  selected,
  lastBookElementRef,
  dataRows,
}) => {
  const isSelected = (id) => selected.indexOf(id) !== -1;

  // render column according to renderColumn or column type
  const renderColumn = (key, colConfig, row, index) => {
    if (colConfig.renderColumn) {
      return colConfig.renderColumn(row, index);
    }
    switch (colConfig.type) {
      case 'DatePicker':
        return moment(moment(row[key], config.date.backendGetFormat)).format(
          config.date.defaultRenderFormat,
        );

      // this renderer will change timezone automatically, if different behaviour is required you can add renderColumn in your config
      case 'DateTimePicker':
        return moment(
          moment.tz(
            row[key],
            config.dateTime.backendGetFormat,
            config.dateTime.backendTimezone,
          ),
        )
          .local()
          .format(config.date.defaultRenderFormat);

      case 'AutoComplete':
        return colConfig.gridDisplayField
          ? row[colConfig.gridDisplayField]
          : row[key];
      default:
        return row[key];
    }
  };

  return (
    <TableBody>
      {dataRows &&
        dataRows.map((row, index) => {
          const isItemSelected = isSelected(row[idStore]);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              key={`tableRow_${idStore}_${row[idStore]}`}
              hover
              onClick={(event) => handleClickRow(event, row)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              selected={isItemSelected}
              // ref={lastBookElementRef}
              {...(parseInt(dataRows.length, 10) === index + 1 && {
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
                          {renderColumn(nameKey, values, row, index)}
                        </TableCell>
                      )}
                    </React.Fragment>
                  );
                },
              )}

              <TableCell align="right">
                {dataConfig.actionsTableCell &&
                typeof dataConfig.actionsTableCell.onClick === 'function' ? (
                  <ButtonPxp
                    icon={dataConfig.actionsTableCell.icon}
                    onClick={() => dataConfig.actionsTableCell.onClick(row)}
                  />
                ) : (
                  <MenuTableCell buttons={buttonsTableCell} row={row} />
                )}
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
