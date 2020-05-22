import React from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Box,
  TableSortLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  spacer: {
    flex: 0,
  },
  tableHead: {
    whiteSpace: 'nowrap',
  },
  body: {
    textTransform: 'capitalize',
    whiteSpace: 'nowrap',
  },
}));

//React-table v7 is a headless library for managing tables in react.
//I like the idea behind the fact that I, as the developer, am entirely responsible for how the table looks.
//I have tried different libraries in the past, and unfortunately, many impose their own UIs, or make it challenging to tweak.
//The goal of this component is to create a table that maps (again ...) MUI's UI (through its tables components)
//with react-table's features like pagination, filtering, sorting, etc.
//In this example, I am only making use of sorting and pagination.
//This is a re-usable component once again, which means that it can be used many times across the project.
const ReactTableMui = ({ columns, data, defaultPageSize }) => {
  const classes = useStyles();
  defaultPageSize = defaultPageSize || 10;
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    setPageSize,
    gotoPage,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: defaultPageSize,
      },
    },
    useSortBy,
    usePagination,
  );

  const handlePageChange = (_event, newPage) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (_event) => {
    setPageSize(parseInt(_event.target.value, 10));
  };

  const handleNextPage = () => {
    nextPage();
  };

  const handlePreviousPage = () => {
    previousPage();
  };

  return (
    <React.Fragment>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  classes={{ head: classes.tableHead }}
                  style={{ width: column.width }}
                  sortDirection={column.isSortedDesc ? 'desc' : 'asc'}
                  {...column.getHeaderProps(
                    column.getSortByToggleProps(),
                  )}
                >
                  {column.render('Header')}
                  <TableSortLabel
                    direction={column.isSortedDesc ? 'desc' : 'asc'}
                    active={column.isSorted}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow hover {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TableCell
                    classes={{ body: classes.body }}
                    {...cell.getCellProps()}
                  >
                    {cell.render('Cell')}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Box mt={2} mb={2.5}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 25, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={pageSize}
          page={pageIndex}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          backIconButtonProps={{
            onClick: handlePreviousPage,
            disabled: !canPreviousPage,
          }}
          nextIconButtonProps={{
            onClick: handleNextPage,
            disabled: !canNextPage,
          }}
        />
      </Box>
    </React.Fragment>
  );
};

export default ReactTableMui;
