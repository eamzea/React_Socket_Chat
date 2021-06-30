import moment from 'moment';

export const translateDate = date => {
  const newDate = moment(date);

  return newDate.format('h:mm a | MMMM Do');
};
