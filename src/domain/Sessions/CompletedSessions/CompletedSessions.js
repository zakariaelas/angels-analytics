import React from 'react';
import { useSelector } from 'react-redux';
import { completedSelector } from '../SessionsReducer';
import { Typography } from '@material-ui/core';
import CompletedSessionsTotalPaid from './CompletedSessionsTotalPaid';
import CompletedSessionsTable from './CompletedSessionsTable';

const CompletedSessions = (props) => {
  const completed = useSelector(completedSelector);
  return (
    <>
      <Typography variant="h6" component="span">
        Total:{' '}
      </Typography>
      <CompletedSessionsTotalPaid />
      <CompletedSessionsTable sessions={completed} />
    </>
  );
};

export default CompletedSessions;
