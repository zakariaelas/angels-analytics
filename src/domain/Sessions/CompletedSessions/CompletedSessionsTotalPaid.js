import React from 'react';
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { totalPaidSelector } from '../SessionsReducer';

//Thought it would be better to make this a component by itself with its own subscription to the redux store
const CompletedSessionsTotalPaid = (props) => {
  //The totalPaidSelector returns the sum of the amount paid of each row from the completed sessions.
  //The totalPaidSelector is created using reselect, which means that it is memoized.
  //This is helpful, because we will not need to iterate over all rows and compute the sum everytime an action is dispatched
  //As mentioned in ./ActiveSessions, the advantage of using a selector is the fact that this component does not rely
  //on the structure of our store.
  //If tomorrow, our api response changes its format, we will only need to change the selector, as opposed to changing all
  //components that use that part of our store
  const total = useSelector(totalPaidSelector);
  return (
    <Typography variant="body1" component="span">{`$${total.toFixed(
      2,
    )}`}</Typography>
  );
};

export default CompletedSessionsTotalPaid;
