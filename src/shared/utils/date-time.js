import { dropLast } from 'ramda';
import { format, addHours } from 'date-fns';

export const formatSessionTime = time => {
  const localTime = dropLast(1, time);
  return `${format(new Date(localTime), 'p')} - ${format(addHours(new Date(localTime), 1), 'p')}`;
};

export const formatSessionDate = date => format(new Date(`${date}T00:00`), 'eeee dd, MMMM');
