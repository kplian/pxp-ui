import React from 'react';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";
import TableHead from "@material-ui/core/TableHead";

const TableHeadPxp = (props) => {


  const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, statesShowColumn} = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        { statesShowColumn['checkbox_'] && <TableCell padding="checkbox">
             <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
              />
          </TableCell>
          }


        { Object.entries(props.headCells).map(([nameKey, values], index) => (
          <React.Fragment key={`tablecell_${nameKey}`}>
            {statesShowColumn[nameKey] && <TableCell

              //align={props.headCells.numeric ? 'right' : 'left'}
              align={'left'}
              //padding={headCell.disablePadding ? 'none' : 'default'}
              padding={'default'}
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
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>}
          </React.Fragment>
          )
        )}
        <TableCell style={{width:'5%'}} align="right">
          Actions
        </TableCell>

      </TableRow>
    </TableHead>
  );
};

export default TableHeadPxp;

TableHeadPxp.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
