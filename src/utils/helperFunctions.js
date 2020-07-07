/* eslint-disable camelcase */
import moment from 'moment';

export function findClosestDate(tourDatesData) {
  const now = moment();
  let closestDate = moment().add(10, 'year');

  tourDatesData.forEach((tourDate) => {
    const { end_date } = tourDate;

    if (Math.abs(now.diff(end_date)) < Math.abs(now.diff(closestDate))) {
      closestDate = end_date;
    }
  });

  if (!closestDate) {
    return tourDatesData[tourDatesData.length - 1].end_date;
  }
  return closestDate;
}

export function findById(options, id) {
  return options.find((option) => option.id === Number(id));
}

export function transformTourDateData({ start_date, end_date, event_city }) {
  if (moment(end_date).isAfter(start_date, 'year')) {
    // 'San Diego - Dec 29, 2019 - Jan 5, 2020
    return `${event_city.name}: ${moment(start_date).format(
      'MMM D, YYYY',
    )}-${moment(end_date).format('MMM D, YYYY')}`;
  }
  if (moment(end_date).isAfter(start_date, 'month')) {
    // 'San Diego - Nov 29-Dec 5, 2019
    return `${event_city.name}: ${moment(start_date).format(
      'MMM D',
    )} - ${moment(end_date).format('MMM D, YYYY')}`;
  }
  // 'San Diego - Dec 29-30, 2019
  return `${event_city.name}: ${moment(start_date).format('MMM D')}-${moment(
    end_date,
  ).format('D, YYYY')}`;
}
