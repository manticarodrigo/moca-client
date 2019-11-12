import React, { useMemo } from 'react';
import { format, isToday, isAfter, differenceInMinutes } from 'date-fns';

import { getDateForString } from '@src/utlities/dates';

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
  const { dateString, appointments, awayDays = [] } = item;

  const { isDateToday, day, month, year, dayOfWeek } = useMemo(() => {
    const date = getDateForString(dateString);

    return {
      isDateToday: isToday(date),
      day: format(date, 'dd'),
      month: format(date, 'MMM'),
      year: format(date, 'yyyy'),
      dayOfWeek: format(date, 'cccc'),
    };
  }, [dateString]);

  const { total, completed, completedDocs, totalDocs, totalTime, earnings } = useMemo(() => {
    const data = {
      total: 0,
      completed: 0,
      totalDocs: 0,
      completedDocs: 0,
      totalTime: 0,
      earnings: 0,
    };

    appointments.forEach((appointment) => {
      const { startTime, endTime } = appointment;

      data.total += 1;
      data.totalDocs += 1;
      data.totalTime += differenceInMinutes(new Date(endTime), new Date(startTime));
      data.earnings += appointment.price;

      if (isAfter(new Date(endTime), nowDate)) {
        data.completed += 1;
      }

      if (appointment.note) {
        data.completedDocs += 1;
      }
    });
    return data;
  }, [appointments]);

  type Variants = {
    viewVariant: keyof typeof Views;
    color: keyof typeof Colors;
  }

  const { viewVariant, color }: Variants = useMemo(() => {
    if (awayDays.length) {
      return { viewVariant: 'roundedBorderSemiGrey', color: 'semiGrey' };
    }

    if (total === 0) {
      return { viewVariant: 'borderCardDisabled', color: 'semiGrey' };
    }

    if (isDateToday) {
      return { viewVariant: 'borderShadowCard', color: 'primary' };
    }

    return { viewVariant: 'card', color: 'secondary' };
  }, [awayDays, total, isDateToday]);

  if (!dateString) return null;

  return (
    <View
      row
      flex={1}
      mt={isFirst ? 3 : 2}
      mx={3}
      mb={isLast ? 3 : 0}
      variant={viewVariant}
      onPress={(total !== 0 || awayDays.length) ? onPressDate : undefined}
    >
      <View>
        <View row alignCenter>
          <Text variant="titleLarge" color={color}>{day}</Text>
          <View ml={2}>
            <Text variant="lightSmallest" color={color}>{month}</Text>
            <Text variant="lightSmallest" color={color}>{year}</Text>
          </View>
        </View>

        <Text variant="regularSmall" color={color}>{dayOfWeek}</Text>
      </View>

      {!!awayDays.length && (
        <View px={4} justifyCenter alignCenter>
          <Tag icon="clock" type="warning" placeholder="Away" />
        </View>
      )}

      <View column flex={1}>
        <View row flex={1} justifyEnd mb={2}>
          <Tag
            ml={2}
            icon="report"
            type={total === 0 ? 'border' : 'borderLight'}
            placeholder={`${completedDocs}/${totalDocs}`}
          />
          <Tag
            ml={2}
            icon="appointment"
            type={total === 0 ? 'border' : 'fill'}
            placeholder={`${completed}/${total}`}
          />
        </View>

        <View row flex={1} justifyEnd>
          <Tag
            ml={2}
            icon="clock"
            type={total === 0 ? 'border' : 'borderLight'}
            placeholder={totalTime}
          />
          <Tag
            ml={2}
            icon="dollar"
            type={total === 0 ? 'border' : 'fill'}
            placeholder={earnings}
          />
        </View>
      </View>

    </View>
  );
};

export default React.memo(ScheduleRow);
