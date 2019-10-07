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
    startDayOfMonth: format(dateStart, 'DD'),
    startMonthYear: format(dateStart, 'MMM YYYY'),
    startDayOfWeek: format(dateStart, 'dddd'),
    endDayOfMonth: format(dateEnd, 'DD'),
    endMonthYear: format(dateEnd, 'MMM YYYY'),
    endDayOfWeek: format(dateEnd, 'dddd'),
  }), [dateStart, dateEnd]);

  return (
    <View column variant="card" spacing={{ p: 0 }}>

      <View row justifyBetween alignCenter variant="card" spacing={{ py: 4 }}>

        <View row>
          <Text variant="titlePrimaryLarge">{startDayOfMonth}</Text>
          <View column spacing={{ ml: 2 }}>
            <Text variant="lightPrimarySmallest">
              {startMonthYear}
            </Text>
            <Text variant="regularPrimary">
              {startDayOfWeek}
            </Text>
          </View>
        </View>

        <ArrowRightIcon tint="primary" size={1.5} />

        <View row>
          <Text variant="titleGreyLarge">{endDayOfMonth}</Text>
          <View column spacing={{ ml: 2 }}>
            <Text variant="lightGreySmallest">
              {endMonthYear}
            </Text>
            <Text variant="regularGrey">
              {endDayOfWeek}
            </Text>
          </View>
        </View>

      </View>

      <View row justifyBetween variant="card" bgColor="warning">
        <NoMessagesIcon />
        <Text variant="regularPrimary">
          You are set as away. You will not receive messages or show up in search.
        </Text>
      </View>

    </View>
  );
};

export default AwayCard;
