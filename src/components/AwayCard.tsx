import React, { useMemo } from 'react';
import { format } from 'date-fns';

import { ArrowRightIcon, NoMessagesIcon } from '@src/components/icons';
import View from '@src/components/View';
import Text from '@src/components/Text';

const AwayCard = ({ dateStart, dateEnd }) => {
  const {
    startDayOfMonth,
    startMonthYear,
    startDayOfWeek,
    endDayOfMonth,
    endMonthYear,
    endDayOfWeek,
  } = useMemo(() => ({
    startDayOfMonth: format(dateStart, 'dd'),
    startMonthYear: format(dateStart, 'MMM yyyy'),
    startDayOfWeek: format(dateStart, 'cccc'),
    endDayOfMonth: format(dateEnd, 'dd'),
    endMonthYear: format(dateEnd, 'MMM yyyy'),
    endDayOfWeek: format(dateEnd, 'cccc'),
  }), [dateStart, dateEnd]);

  return (
    <View p={0} variant="card">

      <View row justifyBetween alignCenter py={4} variant="card">

        <View row>
          <Text variant="titleLarge">{startDayOfMonth}</Text>
          <View ml={2}>
            <Text variant="lightSmallest" color="primary">
              {startMonthYear}
            </Text>
            <Text variant="regularSmall" color="primary">
              {startDayOfWeek}
            </Text>
          </View>
        </View>

        <ArrowRightIcon tint="primary" size={1.5} />

        <View row>
          <Text variant="title" size={5} color="grey">{endDayOfMonth}</Text>
          <View ml={2}>
            <Text variant="lightSmallest" color="grey">
              {endMonthYear}
            </Text>
            <Text variant="regularSmall" color="grey">
              {endDayOfWeek}
            </Text>
          </View>
        </View>

      </View>

      <View row justifyBetween variant="card" bgColor="warning">
        <NoMessagesIcon />
        <View row flex={1} px={3}>
          <Text variant="regularSmall" color="primary">
            You are set as away. You will not receive messages or show up in search.
          </Text>
        </View>
      </View>

    </View>
  );
};

export default AwayCard;
