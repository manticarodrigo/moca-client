import React from 'react';

import { format } from 'date-fns';

import { ClockIcon, CreditCardIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';

const BillingHistoryTab = () => {
  const sessionHistory = [
    {
      day: format(new Date(2019, 9, 9), 'dd'),
      month: format(new Date(2019, 9, 9), 'MM'),
      year: format(new Date(2019, 9, 9), 'yyyy'),
      therapist: 'Adele Dust',
      duration: '30 mins',
      paymentMethod: 'Master Card',
      payment: '$60',
    },
    {
      day: format(new Date(2019, 9, 9), 'dd'),
      month: format(new Date(2019, 9, 9), 'MM'),
      year: format(new Date(2019, 9, 9), 'yyyy'),
      therapist: 'Adele Dust',
      duration: '30 mins',
      paymentMethod: 'Master Card',
      payment: '$60',
    },
    {
      day: format(new Date(2019, 9, 9), 'dd'),
      month: format(new Date(2019, 9, 9), 'MM'),
      year: format(new Date(2019, 9, 9), 'yyyy'),
      therapist: 'Adele Dust',
      duration: '30 mins',
      paymentMethod: 'Master Card',
      payment: '$60',
    },
    {
      day: format(new Date(2019, 9, 9), 'dd'),
      month: format(new Date(2019, 9, 9), 'MM'),
      year: format(new Date(2019, 9, 9), 'yyyy'),
      therapist: 'Adele Dust',
      duration: '30 mins',
      paymentMethod: 'Master Card',
      payment: '$60',
    },
  ];

  return (
    <View width="100%" height="100%" scroll>
      {sessionHistory.map((session, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={index} row variant="borderBottom" spacing={{ py: 3 }}>
          <View column justifyCenter variant="borderRight" spacing={{ px: 3 }}>
            <Text variant="light" size={5} color="secondary" align="center">{session.day}</Text>
            <Text variant="regular" color="secondary">
              {session.month}
              {' '}
              /
              {' '}
              {session.year}
            </Text>
          </View>
          <View flex={1} column justifyEnd variant="borderRight" spacing={{ px: 3 }}>
            <Text variant="semiBold" spacing={{ ml: 2 }}>{session.therapist}</Text>
            <View flex={1} row wrap spacing={{ my: 2 }}>
              <View row alignCenter spacing={{ m: 1 }}>
                <ClockIcon />
                <Text variant="regular" spacing={{ mx: 1 }}>{session.duration}</Text>
              </View>
              <View row alignCenter spacing={{ m: 1 }}>
                <CreditCardIcon />
                <Text variant="regular" spacing={{ mx: 1 }}>{session.paymentMethod}</Text>
              </View>
            </View>
          </View>
          <View justifyCenter spacing={{ px: 4 }}>
            <Text variant="title">{session.payment}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default BillingHistoryTab;
