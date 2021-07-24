import dayjs from 'dayjs';

function isSameDay(date1, date2) {
  return dayjs(date1).isSame(dayjs(date2), 'day');
}

export {isSameDay};
