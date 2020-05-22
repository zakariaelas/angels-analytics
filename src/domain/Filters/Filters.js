import React, { useCallback, useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { fetchSessions } from '../Sessions/SessionsActions';
import { exportToCSV } from '../Sessions/exportToCSV';
import { Box, Grid, Button, makeStyles } from '@material-ui/core';
import { Formik, Form } from 'formik';
import MuiKeyboardTimePickerFormik from '../../components/MuiKeyboardTimePickerFormik';
import MuiKeyboardDatePickerFormik from '../../components/MuiKeyboardDatePickerFormik';
import * as yup from 'yup';
import MuiFormikTextField from '../../components/MuiFormikTextField';

const useStyles = makeStyles((theme) => ({
  flex: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

//validation schema to be used with formik.
//It can be improved by making sure the end date and time are never before the start date and time
//I am not very familiar with yup aside from the relatively simple use cases
//However, it is a powerful library, and I should definitely read more about it..
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

const Filters = (props) => {
  const classes = useStyles();
  //Using react-redux's useDispatch Hook.
  //I am more familiar with the mapDispatchToProps syntax, however, this one feels much shorter and simpler.
  const dispatch = useDispatch();
  //We make sure to memoize this callback, so as not to create a handler at every rerender.
  //As per https://react-redux.js.org/api/hooks#examples
  const searchSessions = useCallback(
    (filters) => dispatch(fetchSessions(filters)),
    [dispatch],
  );
  //From what I have inspected, the API route takes a "csv" query param and returns the data as csv if set to true.
  //From a client-side perspective, generating a csv feels more like a "side-effect" of querying data, rather than a query itself.
  //Personally, I feel like a regular flow would be like the following:
  //User makes a search -> User sees the results in the table -> User exports the results to a csv to keep as record.
  //Point is, I would rather the export button NOT make an API call, but INSTEAD just take the results from a previous API call
  //and THEN export them to a csv file.
  //However, I chose to stick to the requirements on this one.
  //The reason why we need a "exportClicked" state is because we have 2 buttons (Search + Export) that submit the form, but only one submit handler..
  //So, the workaround I thought of is to keep track of what button was clicked, and execute the corresponding action
  //(either "exportToCSV" or "searchSessions").
  const [exportClicked, setExportClicked] = useState(false);

  return (
    <Box pt={1.5}>
      <Formik
        initialValues={{
          startTime: moment().hours(0).minutes(0),
          startDate: moment(),
          endTime: moment().hours(23).minutes(59),
          endDate: moment(),
          licensePlate: '',
          zoneNumber: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          const startDate = values.startDate.format('yyyy-MM-DD');
          const startTime = values.startTime.format('HH:mm');
          const start_time = `${startDate} ${startTime}`;

          const endDate = values.endDate.format('yyyy-MM-DD');
          const endTime = values.endTime.format('HH:mm');
          const end_time = `${endDate} ${endTime}`;

          const filters = {
            start_time,
            end_time,
            license_plate: values.licensePlate || undefined,
            external_meter_id: values.zoneNumber || undefined,
          };

          if (exportClicked) exportToCSV(filters);
          else searchSessions(filters);
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
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
                    props.submitForm();
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
                  props.submitForm();
                }}
                variant="outlined"
              >
                Export
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Filters;
