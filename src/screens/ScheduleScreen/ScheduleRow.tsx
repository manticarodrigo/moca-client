import React, { useMemo } from 'react';
import { format, isToday, isAfter, differenceInMinutes } from 'date-fns';

import { Views, Colors } from '@src/styles';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Tag from '@src/components/Tag';

import { ListItem } from './ScheduleScreen';

type Props = {
  item: ListItem;
  isLast: boolean;
  isFirst: boolean;
  onPressDate: () => void;
}

const nowDate = new Date();

const ScheduleRow = ({ item, isFirst, isLast, onPressDate }: Props) => {
  const { timestamp, appointments } = item;

  const { isDateToday, day, month, year, dayOfWeek } = useMemo(() => {
    const dateObj = new Date(timestamp);

    return {
      isDateToday: isToday(dateObj),
      day: format(dateObj, 'dd'),
      month: format(dateObj, 'MMM'),
      year: format(dateObj, 'yyyy'),
      dayOfWeek: format(dateObj, 'cccc'),
    };
  }, [timestamp]);

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

  type Variants = {
    viewVariant: keyof typeof Views;
    color: keyof typeof Colors;
  }

  const { viewVariant, color }: Variants = useMemo(() => {
    if (total === 0) {
      return { viewVariant: 'borderCardDisabled', color: 'semiGrey' };
    }

    if (isDateToday) {
      return { viewVariant: 'borderShadowCard', color: 'primary' };
    }

    return { viewVariant: 'card', color: 'secondary' };
  }, [total, isDateToday]);

  if (!timestamp) return null;

  return (
    <View
      variant={viewVariant}
      row
      flex={1}
      spacing={{ mt: isFirst ? 3 : 2, mx: 3, mb: isLast ? 3 : 0 }}
      onPress={total !== 0 ? onPressDate : undefined}
    >
      <View column>
        <View row alignCenter>
          <Text variant="title" color={color}>{day}</Text>
          <View column spacing={{ ml: 2 }}>
            <Text variant="lightSmallest" color={color}>{month}</Text>
            <Text variant="lightSmallest" color={color}>{year}</Text>
          </View>
        </View>

        <Text variant="regularSmall" color={color}>{dayOfWeek}</Text>
      </View>

      <View column flex={1}>
        <View row flex={1} justifyEnd spacing={{ mb: 2 }}>
          <Tag
            icon="report"
            type={total === 0 ? 'border' : 'borderLight'}
            placeholder={`${completedDocs}/${totalDocs}`}
            spacing={{ ml: 2 }}
          />
          <Tag
            icon="appointment"
            type={total === 0 ? 'border' : 'fill'}
            placeholder={`${completed}/${total}`}
            spacing={{ ml: 2 }}
          />
        </View>

        <View row flex={1} justifyEnd>
          <Tag
            icon="clock"
            type={total === 0 ? 'border' : 'borderLight'}
            placeholder={totalTime}
            spacing={{ ml: 2 }}
          />
          <Tag
            icon="dollar"
            type={total === 0 ? 'border' : 'fill'}
            placeholder={earnings}
            spacing={{ ml: 2 }}
          />
        </View>
      </View>

    </View>
  );
};

export default React.memo(ScheduleRow);
