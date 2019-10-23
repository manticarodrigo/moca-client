import React from 'react';
import { CalendarList as RNCalendarList } from 'react-native-calendars';

import { Colors, Texts, Spacing } from '@src/styles';

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
        monthText: { ...Texts.boldPrimary },
        week: {
          ...Spacing.getStyles({ py: 3, px: 4 }),
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        dayHeader: { ...Texts.regularSmallGreyishBrown, textTransform: 'uppercase' },
      },
      'stylesheet.day.period': {
        text: { ...Texts.regularGrey, marginTop: 7 },
      },
    }}

    pastScrollRange={0}
    futureScrollRange={12}
    scrollEnabled
    showScrollIndicator
  />
);

export default CalendarList;
