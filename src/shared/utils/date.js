import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import isBetween from 'dayjs/plugin/isBetween';
import en from 'dayjs/locale/en';
import { sort } from 'ramda';
import {
  FORMAT_SESSION_DATE,
  FORMAT_SESSION_DATE_LONG,
  FORMAT_URL,
  FORMAT_HOUR,
  FORMAT_DATE_PURCHASE,
  FORMAT_DATE_REQUEST,
  FORMAT_DAY_SHORT,
  FORMAT_DAY_NUMBER,
  FORMAT_MONTH,
} from 'shared/constants/date';

dayjs.extend(utc);
dayjs.extend(advancedFormat);
dayjs.extend(isBetween);
dayjs.locale({
  ...en,
  weekStart: 1,
});

export const getUTCDate = (date = new Date()) => dayjs(new Date(date)).utc();

export const shortSessionDate = date => getUTCDate(date).format(FORMAT_SESSION_DATE);

export const longSessionDate = date => getUTCDate(date).format(FORMAT_SESSION_DATE_LONG);

export const urlFormattedDate = date => getUTCDate(date).format(FORMAT_URL);

export const startOfWeek = date => getUTCDate(date).startOf('week');

export const endOfWeek = date => getUTCDate(date).endOf('week');

export const hourRange = time =>
  `${getUTCDate(time).format(FORMAT_HOUR)} - ${getUTCDate(time)
    .add(1, 'hour')
    .format(FORMAT_HOUR)}`;

export const weekRangeTitle = date =>
  ` WEEK ${startOfWeek(date).format(FORMAT_MONTH)} ${startOfWeek(date).date()} - ${endOfWeek(
    date
  ).format(FORMAT_MONTH)} ${endOfWeek(date).date()}`;

export const purchaseFormattedDate = date => getUTCDate(date).format(FORMAT_DATE_PURCHASE);

export const requestFormattedDate = date => getUTCDate(date).format(FORMAT_DATE_REQUEST);

export const isSameDay = (date1, date2) =>
  requestFormattedDate(date1) === requestFormattedDate(date2);

export const add = (date, time, measure) => getUTCDate(date).add(time, measure);

export const subtract = (date, time, measure) => getUTCDate(date).subtract(time, measure);

export const weekRange = date => {
  let dates = [];
  for (let i = 0; i < 7; i += 1) {
    dates = [...dates, getUTCDate(date).add(i, 'days')];
  }
  return dates;
};

export const dayShort = date => getUTCDate(date).format(FORMAT_DAY_SHORT);

export const dayNumber = date => getUTCDate(date).format(FORMAT_DAY_NUMBER);

export const isThisWeek = date =>
  dayjs(new Date(date)).isBetween(startOfWeek(new Date()), endOfWeek(new Date()));

export const isPast = date =>
  dayjs(date).format(FORMAT_DATE_REQUEST) < new Date().toLocaleDateString();

export const sortSessionsByDate = sessions =>
  sort((a, b) => (dayjs(new Date(a.time)).isAfter(dayjs(new Date(b.time))) ? 1 : -1), sessions);

export const formatSessionTime = time => getUTCDate(time).format(FORMAT_HOUR);
export const formatSessionDate = time => getUTCDate(time).format(FORMAT_DATE_PURCHASE);

export const semSessionFormatTime = (date, time) =>
  `${shortSessionDate(date)} ${formatSessionTime(time)}`;
