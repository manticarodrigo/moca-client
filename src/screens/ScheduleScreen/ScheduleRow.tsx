import React, { useMemo } from 'react';
import { format, isToday } from 'date-fns';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Tag from '@src/components/Tag';

const ScheduleRow = ({ date, item, onPressDate }) => {
  const { isDateToday, month, dayOfWeek } = useMemo(() => ({
    isDateToday: isToday(date.timestamp),
    month: format(date.timestamp, 'MMM'),
    dayOfWeek: format(date.timestamp, 'cccc'),
  }), [date]);

  const {
    completedDocuments = '0',
    documents = '0',
    completedAppointments = '0',
    appointments = '0',
    timeSpent = '0',
    earnings = '0',
  } = useMemo(() => ({ ...item }), [item]);

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
        <View row>
          <Text variant={isDateToday ? 'titlePrimaryLarge' : 'titleSecondaryLarge'}>
            {date.day}
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
              {date.year}
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
            placeholder={`${completedDocuments}/${documents}`}
            spacing={{ ml: 2 }}
          />
          <Tag
            icon="appointment"
            type="fill"
            placeholder={`${completedAppointments}/${appointments}`}
            spacing={{ ml: 2 }}
          />
        </View>

        <View row flex={1} justifyEnd>
          <Tag icon="clock" type="border" placeholder={timeSpent} spacing={{ ml: 2 }} />
          <Tag icon="dollar" type="fill" placeholder={earnings} spacing={{ ml: 2 }} />
        </View>
      </View>
    </View>
  );
};

export default React.memo(ScheduleRow);
