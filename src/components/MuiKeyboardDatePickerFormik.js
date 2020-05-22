import React from 'react';
import { useField } from 'formik';
import { KeyboardDatePicker } from '@material-ui/pickers';
import PropTypes from 'prop-types';

//Re-usable component that couples MUI-pickers' KeyboardDatePicker component with Formik.
//See MuiFormikTextField for reasons behind why we need this mapping/coupling.
const MuiKeyboardDatePickerFormik = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const currentError = meta.error;
  return (
    <KeyboardDatePicker
      {...field}
      onChange={(value) => {
        helpers.setValue(value);
      }}
      onOpen={() => helpers.setTouched(true)}
      onError={(error) => {
        if (error && error !== currentError) helpers.setError(error);
      }}
      error={Boolean(currentError)}
      helperText={currentError}
      {...props}
    />
  );
};

MuiKeyboardDatePickerFormik.propTypes = {
  name: PropTypes.string.isRequired,
};

export default MuiKeyboardDatePickerFormik;
