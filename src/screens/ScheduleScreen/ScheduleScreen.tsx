import React, { useState } from 'react';
import { Agenda } from 'react-native-calendars';
import { format, addDays } from 'date-fns';

import { Colors } from '@src/styles';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Tag from '@src/components/Tag';

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
    <View variant="cardRight" column flex={1} spacing={{ mt: 2, mr: 3 }}>
      <View row flex={1} justifyEnd spacing={{ mb: 2 }}>
        <Tag icon="report" type="borderLight" placeholder={`${item.completedDocuments}/${item.documents}`} />
      </View>
      <View row flex={1} justifyEnd>
        <Tag icon="appointment" type="fill" placeholder={`${item.completedAppointments}/${item.appointments}`} />
        <Tag icon="clock" type="border" placeholder={item.timeSpent} spacing={{ ml: 2 }} />
        <Tag icon="dollar" type="fill" placeholder={item.earnings} spacing={{ ml: 2 }} />
      </View>
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
    <View variant="cardRight" column flex={1} spacing={{ mt: 2, mr: 3 }}>
      <View row flex={1} justifyEnd spacing={{ mb: 2 }}>
        <Tag icon="report" placeholder="0/0" />
      </View>
      <View row flex={1} justifyEnd>
        <Tag icon="appointment" placeholder="0/0" />
        <Tag icon="clock" placeholder="0" spacing={{ ml: 1 }} />
        <Tag icon="dollar" placeholder="0" spacing={{ ml: 1 }} />
      </View>
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
        dotColor: Colors.semiGreyLighter,
        'stylesheet.day.basic': {
          selected: {
            backgroundColor: Colors.secondary,
            borderRadius: 8,
          },
        },
      }}
    />
  );
};

ScheduleScreen.navigationOptions = {
  title: 'Calendar',
};

export default ScheduleScreen;
