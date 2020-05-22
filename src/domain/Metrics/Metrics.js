import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Divider,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import TabPanel from '../../components/TabPanel';
import CompletedSessions from '../Sessions/CompletedSessions/CompletedSessions';
import ActiveSessions from '../Sessions/ActiveSessions/ActiveSessions';

const Metrics = (props) => {
  //Using react-redux's useSelector hook.
  //This is essentially the same as mapStateToProps, however, with difference highlighted here: https://react-redux.js.org/api/hooks#useselector
  //We extract isLoading and error from the redux store, because that's what this component cares about.
  const { isLoading, error } = useSelector((state) => ({
    isLoading: state.sessions.isLoading,
    error: state.sessions.error,
  }));
  //state used for the Tabs component
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Metrics
      </Typography>
      <Box pt={2}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Completed" />
          <Tab label="Active" />
        </Tabs>
        <Divider />
      </Box>
      <Box pt={2.5}>
        {error && (
          <Typography
            color="error"
            align="center"
            variant="h4"
            gutterBottom
          >
            {error}
          </Typography>
        )}
        <TabPanel
          pb={2}
          isLoading={isLoading}
          value={value}
          index={0}
        >
          <CompletedSessions />
        </TabPanel>
        <TabPanel
          pb={2}
          isLoading={isLoading}
          value={value}
          index={1}
        >
          <ActiveSessions />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Metrics;
