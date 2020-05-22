import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import LoadingSpinner from './LoadingSpinner';

//This component is intended to be used with the Tabs component of material ui.
//Provided an index and a value, the component makes the decision whether to be rendered or not.
//I like it this way because it makes whatever component that is using Tabs much more clearer and concise.
//If this component is not used, we'll end up with a lot of conditional rendering "blocks" across the parent component.
//This component might also take a "isLoading" prop we use to either
//render the LoadingSpinner component, or the children passed to TabPanel
const TabPanel = (props) => {
  const { children, value, index, isLoading, ...other } = props;

  return (
    <Box hidden={value !== index} {...other}>
      {value === index && (
        <Box>{isLoading ? <LoadingSpinner /> : children}</Box>
      )}
    </Box>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TabPanel;
