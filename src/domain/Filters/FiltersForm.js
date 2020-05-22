import React from 'react';
import { withFormik, Form } from 'formik';
import * as yup from 'yup';
import MuiFormikTextField from '../../components/MuiFormikTextField';
import MuiKeyboardTimePickerFormik from '../../components/MuiKeyboardTimePickerFormik';
import MuiKeyboardDatePickerFormik from '../../components/MuiKeyboardDatePickerFormik';
import { Box, makeStyles, Grid, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  flex: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

const FiltersForm = ({ setExportClicked, ...props }) => {
  const classes = useStyles();

  return (
    <Form>
      <Grid container spacing={2}>
        <Grid item md={2} sm={6} xs={12}>
          <MuiKeyboardDatePickerFormik
            format="MM/DD/yyyy"
            inputVariant="outlined"
            label="Start Date"
            name="startDate"
          />
        </Grid>
        <Grid item md={2} sm={6} xs={12}>
          <MuiKeyboardTimePickerFormik
            name="startTime"
            inputVariant="outlined"
            label="Start Time"
            fullWidth
            mask="__:__ _M"
          />
        </Grid>
        <Grid item md={2} sm={6} xs={12}>
          <MuiKeyboardDatePickerFormik
            name="endDate"
            format="MM/DD/yyyy"
            inputVariant="outlined"
            label="End Date"
          />
        </Grid>
        <Grid item md={2} sm={6} xs={12}>
          <MuiKeyboardTimePickerFormik
            name="endTime"
            inputVariant="outlined"
            label="End Time"
            fullWidth
            mask="__:__ _M"
          />
        </Grid>
        <Grid item md={2} sm={6} xs={12}>
          <MuiFormikTextField
            fullWidth
            name="zoneNumber"
            variant="outlined"
            label="Zone Number"
          />
        </Grid>
        <Grid item md={2} sm={6} xs={12}>
          <MuiFormikTextField
            name="licensePlate"
            fullWidth
            variant="outlined"
            label="License Plates"
          />
        </Grid>
      </Grid>
      <Box mt={1.5} className={classes.flex}>
        <Box mr={0.5}>
          <Button
            onClick={() => {
              setExportClicked(false);
              props.handleSubmit();
            }}
            color="primary"
            variant="outlined"
          >
            Search
          </Button>
        </Box>
        <Button
          color="secondary"
          onClick={() => {
            setExportClicked(true);
            props.handleSubmit();
          }}
          variant="outlined"
        >
          Export
        </Button>
      </Box>
    </Form>
  );
};

const validationSchema = yup.object().shape({
  startDate: yup
    .date()
    .nullable()
    .required('You need to choose a valid date'),
  startTime: yup
    .date()
    .nullable()
    .required('You need to choose a valid start time.'),
  endDate: yup
    .date()
    .nullable()
    .required('You need to choose a valid date'),
  endTime: yup
    .date()
    .required('You need to choose a valid end time')
    .nullable(),
  zoneNumber: yup.string(),
  licensePlate: yup.string(),
});

const formikOptions = {
  mapPropsToValues: ({ initialValues }) => {
    return { ...initialValues };
  },
  validationSchema,
  handleSubmit: (values, { setSubmitting, props }) => {
    props.onSubmit(values);
    setSubmitting(false);
  },
  enableReinitialize: true,
  displayName: 'FiltersForm',
};

export default withFormik(formikOptions)(FiltersForm);
