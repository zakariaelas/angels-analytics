import React from 'react';
import { useSelector } from 'react-redux';
import { activeSelector } from '../SessionsReducer';
import ActiveSessionsTable from './ActiveSessionsTable';

const ActiveSessions = (props) => {
  //The main advantage of using a selector is the ability it gives our ActiveSessions to be "store-agnostic"
  //What this means is that ActiveSessions has no idea about our redux store
  //If in the future we make changes to the structure of state.sessions, we will not need to make a change to this component
  //or to any component that subscribes to that part of the store.
  const active = useSelector(activeSelector);
  return (
    <>
      <ActiveSessionsTable sessions={active} />
    </>
  );
};

export default ActiveSessions;
