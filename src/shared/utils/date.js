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
  FORMAT_DATE_SUBSCRIPTION,
  FORMAT_DATE_REQUEST,
  FORMAT_DAY_SHORT,
  FORMAT_DAY_NUMBER,
  FORMAT_MONTH,
  FORMAT_SHARE_SESSION_DATE,
  FORMAT_SHARE_SESSION_TIME,
  FORMAT_DATETIME,
} from 'shared/constants/date';

dayjs.extend(utc);
dayjs.extend(advancedFormat);
dayjs.extend(isBetween);
dayjs.locale({
  ...en,
  weekStart: 1,
});

export const getUTCDate = (date = new Date()) => dayjs(new Date(date)).utc();

export const shortSessionDate = (date) => getUTCDate(date).format(FORMAT_SESSION_DATE);

export const longSessionDate = (date) => getUTCDate(date).format(FORMAT_SESSION_DATE_LONG);

export const urlFormattedDate = (date) => getUTCDate(date).format(FORMAT_URL);

export const startOfWeek = (date) => getUTCDate(date).startOf('week');

export const endOfWeek = (date) => getUTCDate(date).endOf('week');

export const hourRange = (time, durationInMinutes = 60) => {
  const startTimeHour = getUTCDate(time).format(FORMAT_HOUR);
  const endTimeHour = getUTCDate(time).add(durationInMinutes, 'minutes').format(FORMAT_HOUR);

  return `${startTimeHour} - ${endTimeHour}`;
};

export const weekRangeTitle = (date) =>
  ` WEEK ${startOfWeek(date).format(FORMAT_MONTH)} ${startOfWeek(date).date()} - ${endOfWeek(
    date
  ).format(FORMAT_MONTH)} ${endOfWeek(date).date()}`;

export const purchaseFormattedDate = (date) => getUTCDate(date).format(FORMAT_DATE_PURCHASE);

export const requestFormattedDate = (date) => getUTCDate(date).format(FORMAT_DATE_REQUEST);

export const subscriptionPeriodFormattedDate = (date) =>
  getUTCDate(date).local().format(FORMAT_DATE_SUBSCRIPTION);

export const isSameDay = (date1, date2) =>
  requestFormattedDate(date1) === requestFormattedDate(date2);

export const isToday = (date) => dayjs().isSame(date, 'date');

export const add = (date, time, measure) => getUTCDate(date).add(time, measure);

export const subtract = (date, time, measure) => getUTCDate(date).subtract(time, measure);

export const weekRange = (date) => {
  let dates = [];
  for (let i = 0; i < 7; i += 1) {
    dates = [...dates, getUTCDate(date).add(i, 'days')];
  }
  return dates;
};

export const dayShort = (date) => getUTCDate(date).format(FORMAT_DAY_SHORT);

export const dayNumber = (date) => getUTCDate(date).format(FORMAT_DAY_NUMBER);

export const isThisWeek = (date) =>
  dayjs(new Date(date)).isBetween(startOfWeek(new Date()), endOfWeek(new Date()));

export const isInFutureWeek = (date, numberOfWeeks) => {
  const futureDate = getUTCDate(new Date()).add(numberOfWeeks, 'weeks');
  return getUTCDate(date).isBetween(startOfWeek(futureDate), endOfWeek(futureDate), null, '[]');
};

export const isPast = (date) => dayjs(date).diff(dayjs(), 'day') < 0;

export const sortSessionsByDate = (sessions) =>
  sort((a, b) => (dayjs(new Date(a.time)).isAfter(dayjs(new Date(b.time))) ? 1 : -1), sessions);

export const formatSessionTime = (time) => getUTCDate(time).format(FORMAT_HOUR);
export const formatSessionDate = (time) => getUTCDate(time).format(FORMAT_DATE_PURCHASE);

export const formatShareSessionDate = (date) => getUTCDate(date).format(FORMAT_SHARE_SESSION_DATE);
export const formatShareSessionTime = (date) => getUTCDate(date).format(FORMAT_SHARE_SESSION_TIME);

export const formatDateTime = (datetime) => getUTCDate(datetime).format(FORMAT_DATETIME);

export const yearsFrom = (date) => {
  let today = new Date();
  let years;

  years = today.getFullYear() - date.getFullYear();
  if (
    today.getMonth() < date.getMonth() ||
    (today.getMonth() === date.getMonth() && today.getDate() < date.getDate())
  ) {
    years--;
  }

  return years;
};
