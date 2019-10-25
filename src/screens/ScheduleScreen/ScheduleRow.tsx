import React, { useMemo } from 'react';
import { format, isToday, isAfter, differenceInMinutes } from 'date-fns';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Tag from '@src/components/Tag';

import { ScheduleItem } from './ScheduleScreen';

type Props = {
  item: ScheduleItem;
  onPressDate: () => void;
}

const nowDate = new Date();

const ScheduleRow = ({ item, onPressDate }: Props) => {
  const { date, appointments } = item;

  const { isDateToday, day, month, year, dayOfWeek } = useMemo(() => {
    const dateObj = new Date(date);

    return {
      isDateToday: isToday(dateObj),
      day: format(dateObj, 'dd'),
      month: format(dateObj, 'MMM'),
      year: format(dateObj, 'yyyy'),
      dayOfWeek: format(dateObj, 'cccc'),
    };
  }, [date]);

  const { total, completed, completedDocs, totalDocs, totalTime, earnings } = useMemo(() => {
    const data = {
      total: 0,
      completed: 0,
      completedDocs: 0,
      totalDocs: 0,
      totalTime: 0,
      earnings: 0,
    };

    appointments.forEach((appointment) => {
      const { startTime, endTime } = appointment;

      data.total += 1;
      data.totalTime += differenceInMinutes(new Date(endTime), new Date(startTime));
      data.earnings += appointment.price;

      if (isAfter(new Date(endTime), nowDate)) {
        data.completed += 1;
      }
    });
    return data;
  }, [appointments]);

  if (!date) return null;

  return (
    <View
      variant={isDateToday ? 'borderShadowCard' : 'card'}
      row
      flex={1}
      spacing={{ mt: 2, mx: 3 }}
      onPress={onPressDate}
    >
      <View column>
        <View row alignCenter>
          <Text variant={isDateToday ? 'titlePrimaryLarge' : 'titleSecondaryLarge'}>
            {day}
          </Text>
          <View column spacing={{ ml: 2 }}>
            <Text
              variant={isDateToday ? 'lightPrimarySmallest' : 'lightSecondarySmallest'}
            >
              {month}
            </Text>
            <Text
              variant={isDateToday ? 'lightPrimarySmallest' : 'lightSecondarySmallest'}
            >
              {year}
            </Text>
          </View>
        </View>

        <Text variant={isDateToday ? 'regularPrimary' : 'regularSecondary'}>
          {dayOfWeek}
        </Text>
      </View>

      <View column flex={1}>

        <View row flex={1} justifyEnd spacing={{ mb: 2 }}>
          <Tag
            icon="report"
            type="borderLight"
            placeholder={`${completedDocs}/${totalDocs}`}
            spacing={{ ml: 2 }}
          />
          <Tag
            icon="appointment"
            type="fill"
            placeholder={`${completed}/${total}`}
            spacing={{ ml: 2 }}
          />
        </View>

        <View row flex={1} justifyEnd>
          <Tag icon="clock" type="border" placeholder={totalTime} spacing={{ ml: 2 }} />
          <Tag icon="dollar" type="fill" placeholder={earnings} spacing={{ ml: 2 }} />
        </View>
      </View>
    </View>
  );
};

export default React.memo(ScheduleRow);
