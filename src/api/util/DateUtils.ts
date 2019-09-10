import { DocumentNode } from 'graphql';
import IEventDuration from '../interface/IEventDuration';
import moment from 'moment';
import momenttz from 'moment-timezone';

export default class DateUtils {

  public static toDuration(startDate, endDate) {
    const data: IEventDuration = {
      eventRange: (moment(startDate).format(DateUtils.YYYY_MM_DD) === moment(endDate).format(DateUtils.YYYY_MM_DD)) ? 'single-day' : 'date-range',
      endDate: (endDate === null) ? moment().format() : endDate,
      endTime: { dateTime: moment(endDate).format(), timezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
      startDate: (startDate === null) ? moment().format() : startDate,
      startTime: { dateTime: moment(startDate).format(), timezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
    };
    console.log('toDuration', JSON.stringify(data));
    return data;
  }

  public static fromDuration(duration: IEventDuration) {
    console.log('duration', JSON.stringify(duration));
    const startDt = moment(duration.startDate).format(DateUtils.YYYY_MM_DD) + 'T' + moment(duration.startTime.dateTime).format('HH:mm:ss');
    const endDt =  moment(duration.endDate).format(DateUtils.YYYY_MM_DD) + 'T' + moment(duration.endTime.dateTime).format('HH:mm:ss');
    const startTz = duration.startTime.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
    const endTz = duration.endTime.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;

    return {
      start: momenttz(startDt).tz(startTz).format(),
      end: momenttz(endDt).tz(endTz).format(),
      // start: momenttz(startDt). moment(duration.startDate).format(DateUtils.YYYY_MM_DD) + 'T' + moment(duration.startTime.dateTime).format('HH:mm:ss'),
      // end: moment(duration.endDate).format(DateUtils.YYYY_MM_DD) + 'T' + moment(duration.endTime.dateTime).format('HH:mm:ss'),
    };
  }

  public static newDuration(): IEventDuration {
    return {
      eventRange: 'single-day',
      endDate: moment().format(),
      endTime: {
        dateTime: moment().add(1, 'hours').format(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      startDate: moment().format(),
      startTime: {
        dateTime: moment().format(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
  }

  public static toDate(date: string, time: string) {
    return new Date(date + ' ' + time);
  }

  public static formatTime(date) {
    let hours = date.getHours();
    let minutes: string | number = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  public static timeFormatFunction(dateString) {
    if (dateString) {
      const date = new Date(dateString);
      return DateUtils.formatTime(date);
    } else {
      const today = new Date();
      return DateUtils.formatTime(today);
    }
  }

  public static formatDate(date) {
    let dd: string | number = date.getDate();
    let mm: string | number = date.getMonth() + 1;

    const yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return mm + '-' + dd + '-' + yyyy;
  }

  public static dateFormatFunction(dateString) {
    if (dateString === null || dateString === undefined) {
      return '';
    } else if (dateString) {
      const date = new Date(dateString);
      return DateUtils.formatDate(date);
    } else {
      const today = new Date();
      return DateUtils.formatDate(today);
    }
  }

  private static YYYY_MM_DD: string = 'YYYY-MM-DD';

}
