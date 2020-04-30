import React, {useCallback, useRef} from 'react';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import MenuTableCell from "./MenuTableCell";
import MenuItemTableCell from "./MenuItemTableCell";
import TableBody from "@material-ui/core/TableBody";

const TableBodyPxp = ({

                        dataConfig,
  data,
  loading,
  id_store,
                        statesShowColumn,
                        handleCheckInCell,
                        buttonsTableCell,
                        dense,
                        emptyRows,
                        selected,
                        jsonStore,

                      }) => {

  const {datos: rows, total: rowCount } = data;
  const isSelected = (id) => selected.indexOf(id) !== -1;





  return (
    <TableBody>
      {
        rows.map((row, index) => {
          const isItemSelected = isSelected(row[id_store]);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              key={`tableRow_${row[id_store]}`}
              hover
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              selected={isItemSelected}
            >
              {statesShowColumn['checkbox_'] && <TableCell padding="checkbox">
                <Checkbox
                  key={`checkbox_${row[id_store]}`}
                  checked={isItemSelected}
                  inputProps={{ 'aria-labelledby': labelId }}
                  onClick={(event) => handleCheckInCell(event, row)}
                />
              </TableCell>}
              {
                Object.entries(dataConfig.columns).map(([nameKey, values], index) => {

                    return(
                      <React.Fragment key={`cell_${index}_${nameKey}`}>
                        {statesShowColumn[nameKey] && <TableCell align="left">
                          {(values.renderColumn) ? values.renderColumn(row) : row[nameKey] }</TableCell>}
                      </React.Fragment>
                    )
                  }
                )
              }

              <TableCell align="right">
                <MenuTableCell>
                  <MenuItemTableCell buttons={buttonsTableCell} row={row}/>
                </MenuTableCell>
              </TableCell>


            </TableRow>
          )
        })
      }

      {emptyRows > 0 && (
        <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}



    </TableBody>
  );
};

export default TableBodyPxp;
