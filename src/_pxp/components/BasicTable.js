import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import withStyles from "@material-ui/core/styles/withStyles";
import {Typography} from "@material-ui/core";

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const BasicTable = ({ tableName = '', columns, data }) => {
  return (
    <TableContainer component={Paper}>
      <Typography
        component="h3"
        gutterBottom
        variant="overline"
        color="textSecondary"
        align={"center"}
      >
        {tableName}
      </Typography>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              return <TableCell>{column.headerName}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => {
                return <TableCell>{row[column.field]}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
