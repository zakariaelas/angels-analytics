import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Box,
  Divider,
  Paper,
  makeStyles,
} from '@material-ui/core';
import Filters from '../Filters/Filters';
import Metrics from '../Metrics/Metrics';

const useStyles = makeStyles((theme) => ({
  custom: {
    boxShadow: '0 0 14px 0 rgba(53,64,82,.05)',
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Box my={3}>
        <Divider />
      </Box>
      <Paper className={classes.custom}>
        <Box px={2} pt={3.5}>
          <Typography variant="h5" gutterBottom>
            Search
          </Typography>
          <Filters />
        </Box>
        <Box px={2} pt={3.5}>
          <Metrics />
        </Box>
      </Paper>
    </Box>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
