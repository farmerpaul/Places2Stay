import React from 'react';
import {StyleSheet} from 'react-native';
import {Calendar as RNCalendar, DateData} from 'react-native-calendars';
import {colors} from '/theme';

export type CalendarProps = {
  startDate?: DateData;
  setStartDate: (date: DateData | undefined) => void;
  endDate?: DateData;
  setEndDate: (date: DateData | undefined) => void;
  range?: Array<DateData>;
  setRange: (range: Array<DateData> | undefined) => void;
};

const styles = StyleSheet.create({
  calendar: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

const Calendar: React.FC<CalendarProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  range,
  setRange,
}) => {
  /* Event handlers.
  =================================================== */
  const onDayPress = (date: DateData) => {
    if (endDate) {
      // Reset date range if there's already an end date picked.
      setStartDate(date);
      setEndDate(undefined);
      setRange(undefined);
    } else if (startDate) {
      // Complete current date range selection if there's a start date picked.
      setEndDate(date);
      // Generate array of dates to highlight on calendar.
      const dates: Array<DateData> = [];
      for (
        let curDate = new Date(startDate.dateString);
        curDate <= new Date(date.dateString);
        curDate.setDate(curDate.getDate() + 1)
      ) {
        dates.push({
          dateString: curDate.toISOString().split('T')[0],
          day: curDate.getDate() + 1,
          month: curDate.getMonth(),
          year: curDate.getFullYear(),
          timestamp: curDate.getTime(),
        });
      }
      setRange(dates);
    } else {
      // Begin first date range selection by picking start date.
      setStartDate(date);
    }
  };

  /* Render component.
  =================================================== */
  return (
    <RNCalendar
      markingType="period"
      markedDates={{
        ...(range &&
          Object.fromEntries(
            range.map(date => [date.dateString, {color: colors.teal}]),
          )),
        ...(startDate && {
          [startDate.dateString]: {
            color: colors.blue,
            textColor: colors.white,
            startingDay: true,
            endingDay: !endDate || endDate.dateString === startDate.dateString,
          },
        }),
        ...(endDate &&
          endDate.dateString !== startDate?.dateString && {
            [endDate.dateString]: {
              color: colors.blue,
              textColor: colors.white,
              endingDay: true,
            },
          }),
      }}
      onDayPress={onDayPress}
      style={styles.calendar}
      theme={{
        textDayFontSize: 14,
        textMonthFontSize: 14,
        textDayHeaderFontSize: 12,
        // @ts-expect-error
        'stylesheet.calendar.main': {
          container: {
            backgroundColor: colors.white,
            padding: 0,
          },
        },
      }}
    />
  );
};

export default Calendar;
