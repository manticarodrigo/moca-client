import React from 'react';
import { CalendarList as RNCalendarList } from 'react-native-calendars';

import { Colors, Typography, Texts, Spacing } from '@src/styles';

const CalendarList = ({ onDayPress, markedDates }) => (
  <RNCalendarList
    current={new Date()}
    minDate={new Date()}
    onDayPress={onDayPress}
    markingType="period"
    markedDates={markedDates}
    calendarHeight={340}
    theme={{
      arrowColor: 'white',
      'stylesheet.calendar.main': {
        container: {},
      },
      'stylesheet.calendar-list.main': {
        calendar: { backgroundColor: Colors.lightGrey },
      },
      'stylesheet.calendar.header': {
        header: { ...Spacing.getStyles({ pt: 4, px: 2 }), alignItems: 'center' },
        monthText: { ...Typography.getStyles(Texts.semiBold) },
        week: {
          ...Spacing.getStyles({ py: 3, px: 4 }),
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        dayHeader: {
          ...Typography.getStyles({ ...Texts.regularSmall, color: 'greyishBrown' }),
          textTransform: 'uppercase',
        },
      },
      'stylesheet.day.period': {
        text: { ...Typography.getStyles({ ...Texts.regularSmall, color: 'grey' }), marginTop: 7 },
      },
    }}

    pastScrollRange={0}
    futureScrollRange={12}
    scrollEnabled
    showScrollIndicator
  />
);

export default CalendarList;
