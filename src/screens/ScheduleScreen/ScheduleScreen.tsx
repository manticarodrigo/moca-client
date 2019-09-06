import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';

import { Colors, Typography } from '@src/styles';
import View from '@src/components/View';

const ScheduleScreen = () => {
  const [markedDates, setMarkedDates] = useState({});

  const onDayPress = (day) => {
    setMarkedDates((prev) => {
      const { length } = Object.keys(prev);

      if (!length) {
        return {
          ...prev,
          [day.dateString]: {
            startingDay: true,
            selected: true,
            color: Colors.primary,
          },
        };
      }

      if (length === 1) {
        return {
          ...prev,
          [day.dateString]: {
            endingDay: true,
            selected: true,
            color: Colors.primary,
          },
        };
      }

      if (length > 1) {
        return {
          [day.dateString]: {
            startingDay: true,
            selected: true,
            color: Colors.primary,
          },
        };
      }

      return prev;
    });
  };

  return (
    <View flex={1} justifyCenter alignCenter bgColor="lightGrey">
      <Calendar
        markedDates={markedDates}
        markingType="period"
        onDayPress={onDayPress}
        style={{ width: '100%', height: '100%' }}
        theme={{
          calendarBackground: Colors.semiGreyLighter,
          textSectionTitleColor: Colors.greyishBrown,
          arrowColor: Colors.secondary,
          dayTextColor: Colors.greyishBrown,
          textDayFontFamily: 'family-700',
          todayTextColor: Colors.secondary,
          'stylesheet.calendar.header': {
            header: {
              backgroundColor: Colors.primary,
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
              marginLeft: -5,
              marginRight: -5,
              alignItems: 'center',
            },
            monthText: {
              ...Typography.getStyles({ size: 2, weight: '700', color: 'white' }),
              margin: 10,
            },
            arrow: {
              justifyContent: 'center',
              alignItems: 'center',
              width: 32,
              height: 32,
              backgroundColor: Colors.primaryTranslucent,
              borderRadius: 16,
            },
            dayHeader: {
              ...Typography.getStyles({
                size: 0,
                weight: '300',
                color: 'greyishBrown',
                transform: 'uppercase',
                align: 'center',
              }),
              marginTop: 10,
              marginBottom: 10,
              width: 35,
            },
          },
        }}
      />
    </View>
  );
};

ScheduleScreen.navigationOptions = {
  title: 'Schedule',
};

export default ScheduleScreen;
