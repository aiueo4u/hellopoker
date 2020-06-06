import moment from 'moment';
import 'moment/locale/ja';

moment.updateLocale('ja', {
  calendar: {
    sameDay: 'LT',
    lastWeek: 'M月D日LT',
    sameYear: 'M月D日',
  },
  longDateFormat: {
    L: 'YYYY年M月D日',
  },
});

moment.calendarFormat = function(myMoment, now) {
  const diff = myMoment.diff(now, 'days', true);

  return myMoment.year() !== now.year()
    ? 'sameElse'
    : diff < -6
    ? 'sameYear'
    : diff < -1
    ? 'lastWeek'
    : diff < 0
    ? 'lastDay'
    : diff < 1
    ? 'sameDay'
    : diff < 2
    ? 'nextDay'
    : diff < 7
    ? 'nextWeek'
    : 'sameElse';
};

export const buildDate = secondsOrDate => {
  if (typeof secondsOrDate === 'number') {
    return new Date(secondsOrDate * 1000);
  }
  return secondsOrDate;
};

export const elapsedDaysFrom = from => moment().diff(buildDate(from), 'days');
export const formatDate = date => moment(buildDate(date)).format('YYYY/M/D');
export const formatDateCalendar = secondsOrDate => {
  const date = buildDate(secondsOrDate);
  const diff = moment().diff(date, 'days', true);

  return diff < 7 ? moment(date).fromNow() : moment(date).calendar();
};
export const formatDateTime = date => moment(buildDate(date)).format('YYYY/M/D H:mm');
export const formatFromNow = secondsOrDate => moment(buildDate(secondsOrDate)).from();
export const formatYearAndMonth = secondsOrDate => moment(buildDate(secondsOrDate)).format('YYYY年M月');
export const hourAndMin = date => moment(date).format('H:mm');
export const isInWeek = secondsOrDate =>
  moment()
    .subtract(7, 'd')
    .isBefore(buildDate(secondsOrDate));
export const isToday = secondsOrDate => moment().isSame(buildDate(secondsOrDate), 'day');
