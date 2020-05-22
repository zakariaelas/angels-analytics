import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';

//Re-usable component that couples MUI's textfield with Formik.
//This is necessary, because we need to make MUI's TextField component "aware" of Formik.
//One of the things that formik "injects" into the TextField component is the onChange handler.
//It is important to extract this coupling in a separate comparate in order to re-use it across different components
const MuiFormikTextField = ({ name, ...props }) => {
  //makes use of formik v2 useField hook.
  //Another alternative is to use formik's Field component.
  const [field, meta] = useField(name);
  return (
    <>
      <TextField
        error={!!meta.error}
        helperText={meta.error}
        {...field}
        {...props}
      />
    </>
  );
};

//Name prop is mandatory
MuiFormikTextField.propTypes = {
  name: PropTypes.string.isRequired,
};

export default MuiFormikTextField;
