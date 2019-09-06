import React, { useState } from 'react';
import { Agenda } from 'react-native-calendars';
import { format, addDays } from 'date-fns';

import { Colors } from '@src/styles';

import View from '@src/components/View';
import Text from '@src/components/Text';

const ScheduleScreen = () => {
  const [items, setItems] = useState({});

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i += 1) {
        const strTime = format(addDays(day.timestamp, i), 'YYYY-MM-DD');

        if (!items[strTime]) {
          items[strTime] = [];

          const hasItemsForDay = Math.random() >= 0.5;

          if (hasItemsForDay) {
            items[strTime].push({
              strTime,
              appointments: 3,
              completedAppointments: 2,
              timeSpent: 5,
              documents: 2,
              completedDocuments: 2,
              earnings: 60,
            });
          }
        }
      }

      const newItems = {};

      Object.keys(items).forEach((key) => { newItems[key] = items[key]; });

      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => (
    <View variant="cardRight" flex={1} column alignEnd spacing={{ mt: 2, mr: 3 }}>
      <Text variant="lightSecondarySmallest">{`Time Spent: ${item.timeSpent}`}</Text>
      <Text variant="lightSecondarySmallest">{`Appointments: ${item.completedAppointments} / ${item.appointments}`}</Text>
      <Text variant="lightSecondarySmallest">{`Documents: ${item.completedDocuments} / ${item.documents}`}</Text>
      <Text variant="lightSecondarySmallest">{`Earnings: $${item.earnings}`}</Text>
    </View>
  );

  const renderDay = (day) => {
    if (day) {
      return (
        <View variant="cardLeft" column spacing={{ mt: 2, ml: 3 }}>
          <View row>
            <Text variant="titleSecondaryLarge">{day.day}</Text>
            <View column spacing={{ ml: 2 }}>
              <Text variant="lightSecondarySmallest">{format(day.timestamp, 'MMM')}</Text>
              <Text variant="lightSecondarySmallest">{day.year}</Text>
            </View>
          </View>

          <Text variant="regularSecondary">{format(day.timestamp, 'dddd')}</Text>
        </View>
      );
    }

    return null;
  };

  const renderEmptyDate = () => (
    <View variant="cardRight" flex={1} column alignEnd spacing={{ mt: 2, mr: 3 }}>
      <Text variant="lightSecondarySmallest">Nothing to see.</Text>
    </View>
  );

  const rowHasChanged = (r1, r2) => r1.strTime !== r2.strTime;

  return (
    <Agenda
      items={items}
      loadItemsForMonth={loadItems}
      // selected="2019-09-16"
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      rowHasChanged={rowHasChanged}
      renderDay={renderDay}
      theme={{
        backgroundColor: Colors.semiGreyLighter,
        calendarBackground: Colors.primary,
        textSectionTitleColor: Colors.white,
        arrowColor: Colors.secondary,
        dayTextColor: Colors.white,
        monthTextColor: Colors.white,
        textDayFontFamily: 'family-700',
        todayTextColor: Colors.secondaryLighter,
        selectedDayBackgroundColor: Colors.secondary,
        dotColor: Colors.semiGreyLighter,
      }}
    />
  );
};

ScheduleScreen.navigationOptions = {
  title: 'Calendar',
};

export default ScheduleScreen;
