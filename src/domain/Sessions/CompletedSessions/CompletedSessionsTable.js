import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import ReactTableMui from '../../../components/ReactTableMui';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    overflowX: 'auto',
    '&::-webkit-scrollbar': {
      height: '0.3em',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 8px rgba(0,0,0,0.2)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main,
      borderRadius: '200px',
      outline: '1px solid slategrey',
    },
  },
}));

const CompletedSessionsTable = ({ sessions }) => {
  const classes = useStyles();

  const tableData = React.useMemo(
    () =>
      sessions.map((s) => ({
        zoneNumber: s.external_meter_id,
        plateNumber: s.license_plate,
        plateState: s.license_plate_state,
        startDate: moment(s.start_time).format('MM-DD-yyyy'),
        endDate: moment(s.end_time).format('DD-MM-yyyy'),
        startTime: moment(s.start_time).format('HH:mm'),
        endTime: moment(s.end_time).format('HH:mm'),
        amountPaid: s.amount_paid,
        cardType: s.card_type,
        cityCovers: s.city_covers,
      })),
    [sessions],
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Zone Number',
        accessor: 'zoneNumber',
      },
      {
        Header: 'Start Date',
        accessor: 'startDate',
      },
      {
        Header: 'Start Time',
        accessor: 'startTime',
      },
      {
        Header: 'End Date',
        accessor: 'endDate',
      },
      {
        Header: 'End Time',
        accessor: 'endTime',
      },
      {
        Header: 'Plate Number',
        accessor: 'plateNumber',
      },
      { Header: 'Plate State', accessor: 'plateState' },

      {
        Header: 'Amount Paid',
        accessor: 'amountPaid',
        Cell: (cell) => `$${cell.row.original.amountPaid}`,
      },
      {
        Header: 'Card Type',
        accessor: 'cardType',
      },
      {
        Header: 'City Covers',
        accessor: 'cityCovers',
        Cell: (cell) => `$${cell.row.original.cityCovers}`,
      },
      { Header: 'Space Id', accessor: 'spaceId' },
    ],
    [],
  );

  return (
    <Box mb={2} pt={1} px={1.5} className={classes.tableContainer}>
      <ReactTableMui columns={columns} data={tableData} />
    </Box>
  );
};

export default CompletedSessionsTable;
