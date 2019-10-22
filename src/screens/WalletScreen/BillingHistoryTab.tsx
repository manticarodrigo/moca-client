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
    <View height="100%" scroll spacing={{ pt: 5 }}>
      {sessionHistory.map((session, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={index} row variant="borderBottom" spacing={{ py: 3 }}>
          <View column justifyCenter variant="borderRight" spacing={{ p: 2 }} width={90}>
            <Text typography={{ size: 5, color: 'secondary', weight: '300' }} spacing={{ ml: 3, pb: 2 }}>{session.day}</Text>
            <Text typography={{ size: 2, color: 'secondary', weight: '500' }}>
              {session.month}
              {' '}
              /
              {' '}
              {session.year}
            </Text>
          </View>
          <View column justifyEnd variant="borderRight" spacing={{ m: 2 }} width={250}>
            <Text variant="titleSmall" spacing={{ ml: 2 }}>{session.therapist}</Text>
            <View row spacing={{ my: 2 }}>
              <View row spacing={{ mx: 1 }}>
                <ClockIcon />
                <Text variant="regular" spacing={{ mx: 1 }}>{session.duration}</Text>
              </View>
              <View row spacing={{ mx: 1 }}>
                <CreditCardIcon />
                <Text variant="regular" spacing={{ mx: 1 }}>{session.paymentMethod}</Text>
              </View>
            </View>
          </View>
          <View justifyCenter spacing={{ m: 2 }} width={80}>
            <Text variant="titlePrimary">{session.payment}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default BillingHistoryTab;
