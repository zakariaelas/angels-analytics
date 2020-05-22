import * as yup from 'yup';
import moment from 'moment';

//We define a custom validation function that makes sure the end date time is never less than the start end date time.
yup.addMethod(yup.date, 'endDateTimeGreater', function () {
  return this.test(
    'endDateTimeGreater',
    'The end date time needs to be greater than the start date time.',
    function (value) {
      try {
        const startDate = moment(this.resolve(yup.ref('startDate')));
        const startTime = moment(this.resolve(yup.ref('startTime')));
        const endTime = moment(this.resolve(yup.ref('endTime')));
        const startDateTime = startDate
          .hours(startTime.hours())
          .minutes(startTime.minutes());
        const endDateTime = moment(value)
          .hours(endTime.hours())
          .minutes(endTime.minutes());
        return (
          startDateTime.isBefore(endDateTime) || this.createError()
        );
      } catch (err) {
        return this.createError();
      }
    },
  );
});

//validation schema to be used with formik.
//I am not very familiar with yup aside from the relatively simple use cases
//However, it is a powerful library and I should definitely read more about it..
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
    .required('You need to choose a valid date')
    .endDateTimeGreater(
      yup.ref('startDate'),
      yup.ref('startTime'),
      yup.ref('endTime'),
    ),
  endTime: yup
    .date()
    .required('You need to choose a valid end time')
    .nullable(),
  zoneNumber: yup.string(),
  licensePlate: yup.string(),
});

export default validationSchema;
