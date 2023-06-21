/* eslint-disable no-plusplus */
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import isBetween from 'dayjs/plugin/isBetween';
import en from 'dayjs/locale/en';
import { sort } from 'ramda';
import {
  FORMAT_SESSION_DATE,
  FORMAT_SESSION_DATE_LONG,
  FORMAT_SESSION_DATE_EXTRA_LONG,
  FORMAT_URL,
  FORMAT_HOUR,
  FORMAT_HOUR_24,
  FORMAT_DATE_MM_DD_YY,
  FORMAT_DATE_SUBSCRIPTION,
  FORMAT_DATE_REQUEST,
  FORMAT_DAY_SHORT,
  FORMAT_DAY_NUMBER,
  FORMAT_MONTH,
  FORMAT_SHARE_SESSION_DATE,
  FORMAT_SHARE_SESSION_TIME,
  FORMAT_DATETIME,
  FORMAT_SHORT_MONTH_FULL_YEAR,
  SHORT_MONTH_DAY_FULL_YEAR,
  FORMAT_LONG_MONTH_AND_DAY,
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

export const extraLongSessionDate = (date) =>
  getUTCDate(date).format(FORMAT_SESSION_DATE_EXTRA_LONG);

export const urlFormattedDate = (date) => getUTCDate(date).format(FORMAT_URL);

export const startOfWeek = (date) => getUTCDate(date).startOf('week');

export const endOfWeek = (date) => getUTCDate(date).endOf('week');

export const hourRange = (time, durationInMinutes = 60) => {
  const startTimeHour = getUTCDate(time).format(FORMAT_HOUR);
  const endTimeHour = getUTCDate(time).add(durationInMinutes, 'minutes').format(FORMAT_HOUR);

  return `${startTimeHour} - ${endTimeHour}`;
};

export const timeRange24 = (time, durationInMinutes = 60) => {
  const startTimeHour = getUTCDate(time).format(FORMAT_HOUR_24);
  const endTimeHour = getUTCDate(time).add(durationInMinutes, 'minutes').format(FORMAT_HOUR_24);

  return [startTimeHour, endTimeHour];
};

export const weekRangeTitle = (date) => {
  const startMonth = startOfWeek(date).format(FORMAT_MONTH);
  const endMonth = endOfWeek(date).format(FORMAT_MONTH);

  if (startMonth !== endMonth) {
    return `${startMonth} ${startOfWeek(date).date()} - ${endMonth} ${endOfWeek(date).date()}`;
  }

  return `${startMonth} ${startOfWeek(date).date()} - ${endOfWeek(date).date()}`;
};

export const paymentFormattedDate = (date) => getUTCDate(date).format(FORMAT_DATE_MM_DD_YY);

export const requestFormattedDate = (date) => getUTCDate(date).format(FORMAT_DATE_REQUEST);

export const subscriptionPeriodFormattedDate = (date) =>
  getUTCDate(date).local().format(FORMAT_DATE_SUBSCRIPTION);

export const shortMonthDayFullYear = (date) =>
  getUTCDate(date).local().format(SHORT_MONTH_DAY_FULL_YEAR);

export const longMonthAndDate = (date) =>
  getUTCDate(date).local().format(FORMAT_LONG_MONTH_AND_DAY);

export const formatDateShortYear = (date) => getUTCDate(date).local().format(FORMAT_DATE_MM_DD_YY);

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
export const formatSessionEndTime = (time, durationInMinutes) =>
  getUTCDate(time).add(durationInMinutes, 'minutes').format(FORMAT_HOUR);
export const formatSessionDate = (time) => getUTCDate(time).format(FORMAT_DATE_MM_DD_YY);

export const formatShortMonthFullYearDate = (date) =>
  getUTCDate(date).format(FORMAT_SHORT_MONTH_FULL_YEAR);

export const formatShareSessionDate = (date) => getUTCDate(date).format(FORMAT_SHARE_SESSION_DATE);
export const formatShareSessionTime = (date) => getUTCDate(date).format(FORMAT_SHARE_SESSION_TIME);

export const formatDateTime = (datetime) => getUTCDate(datetime).format(FORMAT_DATETIME);

export const getMonth = (date = new Date()) => dayjs(new Date(date)).format(FORMAT_MONTH);

export const yearsFrom = (date) => {
  const today = new Date();
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
