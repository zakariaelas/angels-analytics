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

const ActiveSessionsTable = ({ sessions }) => {
  const classes = useStyles();

  const tableData = React.useMemo(
    () =>
      sessions.map((s) => ({
        zoneNumber: s.external_meter_id,
        plateNumber: s.license_plate,
        plateState: s.license_plate_state,
        startDate: moment(s.start_time).format('MM-DD-yyyy'),
        startTime: moment(s.start_time).format('HH:mm'),
        cardType: s.card_type,
        spaceId: s.space_id,
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
        Header: 'Plate Number',
        accessor: 'plateNumber',
      },
      { Header: 'Plate State', accessor: 'plateState' },
      {
        Header: 'Card Type',
        accessor: 'cardType',
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

export default ActiveSessionsTable;
