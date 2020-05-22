import React from 'react';
import { useField } from 'formik';
import { KeyboardTimePicker } from '@material-ui/pickers';
import PropTypes from 'prop-types';

//Re-usable component that couples MUI-pickers' KeyboardTimePicker component with Formik.
//See MuiFormikTextField for reasons behind why we need this mapping/coupling.
const MuiKeyboardTimePickerFormik = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const currentError = meta.error;
  return (
    <KeyboardTimePicker
      {...field}
      onChange={(value) => {
        //formik's onChange handlers will not work for this component, so we need to set the formik's field value ourselves.
        helpers.setValue(value);
      }}
      onOpen={() => helpers.setTouched(true)}
      onError={(error) => {
        if (error && error !== currentError) helpers.setError(error);
      }}
      helperText={currentError}
      error={Boolean(currentError)}
      {...props}
    />
  );
};

MuiKeyboardTimePickerFormik.propTypes = {
  name: PropTypes.string.isRequired,
};

export default MuiKeyboardTimePickerFormik;
