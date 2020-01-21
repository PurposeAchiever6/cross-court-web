import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import isBetween from 'dayjs/plugin/isBetween';

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
} from 'shared/constants/constants';

dayjs.extend(utc);
dayjs.extend(advancedFormat);
dayjs.extend(isBetween);

export const shortSessionDate = date =>
  dayjs(new Date(date))
    .utc()
    .format(FORMAT_SESSION_DATE);

export const longSessionDate = date =>
  dayjs(new Date(date))
    .utc()
    .format(FORMAT_SESSION_DATE_LONG);

export const urlFormattedDate = date =>
  dayjs(new Date(date))
    .utc()
    .format(FORMAT_URL);

export const startOfWeek = date =>
  dayjs(new Date(date))
    .utc()
    .startOf('week')
    .add(1, 'day');

export const endOfWeek = date =>
  dayjs(new Date(date))
    .utc()
    .endOf('week')
    .add(1, 'day');

export const hourRange = time =>
  `${dayjs(new Date(time))
    .utc()
    .format(FORMAT_HOUR)} - ${dayjs(new Date(time))
    .utc()
    .add(1, 'hour')
    .format(FORMAT_HOUR)}`;

export const weekRangeTitle = date =>
  ` WEEK ${startOfWeek(date).format(FORMAT_MONTH)} ${startOfWeek(date).date()} - ${endOfWeek(
    date
  ).date()}`;

export const purchaseFormattedDate = () =>
  dayjs(new Date())
    .utc()
    .format(FORMAT_DATE_PURCHASE);

export const requestFormattedDate = date =>
  dayjs(new Date(date))
    .utc()
    .format(FORMAT_DATE_REQUEST);

export const isSameDay = (date1, date2) =>
  requestFormattedDate(date1) === requestFormattedDate(date2);

export const add = (date, time, measure) =>
  dayjs(new Date(date))
    .utc()
    .add(time, measure);

export const subtract = (date, time, measure) =>
  dayjs(new Date(date))
    .utc()
    .subtract(time, measure);

export const weekRange = date => {
  let dates = [];
  for (let i = 0; i < 7; i += 1) {
    dates = [
      ...dates,
      dayjs(new Date(date))
        .utc()
        .add(i, 'days'),
    ];
  }
  return dates;
};

export const dayShort = date =>
  dayjs(new Date(date))
    .utc()
    .format(FORMAT_DAY_SHORT);

export const dayNumber = date =>
  dayjs(new Date(date))
    .utc()
    .format(FORMAT_DAY_NUMBER);

export const isThisWeek = date =>
  dayjs(new Date(date)).isBetween(startOfWeek(new Date()), endOfWeek(new Date()));

export const isPast = date => new Date(date) < new Date() && !isSameDay(new Date(date), new Date());
