import React, { useState } from 'react';

import { format } from 'date-fns';

import { ClockIcon, CreditCardIcon, NoteIcon } from '@src/components/icons';


import View from '@src/components/View';
import Text from '@src/components/Text';
import AddNoteModal from './AddNoteModal';
import { FlatList } from 'react-native';

const NotesTab = () => {
  const sessionHistory = [
    {
      id: '1',
      day: format(new Date(2019, 9, 9), 'dd'),
      month: format(new Date(2019, 9, 9), 'mm'),
      year: format(new Date(2019, 9, 9), 'yyyy'),
      therapist: 'Adele Dust',
      duration: '30 mins',
      paymentMethod: 'Master Card',
      payment: '$60',
    },
    {
      id: '2',
      day: format(new Date(2019, 9, 9), 'dd'),
      month: format(new Date(2019, 9, 9), 'mm'),
      year: format(new Date(2019, 9, 9), 'yyyy'),
      therapist: 'Adele Dust',
      duration: '30 mins',
      paymentMethod: 'Master Card',
      payment: '$60',
    },
    {
      id: '3',
      day: format(new Date(2019, 9, 9), 'dd'),
      month: format(new Date(2019, 9, 9), 'mm'),
      year: format(new Date(2019, 9, 9), 'yyyy'),
      therapist: 'Adele Dust',
      duration: '30 mins',
      paymentMethod: 'Master Card',
      payment: '$60',
    },
    {
      id: '4',
      day: format(new Date(2019, 9, 9), 'dd'),
      month: format(new Date(2019, 9, 9), 'mm'),
      year: format(new Date(2019, 9, 9), 'yyyy'),
      therapist: 'Adele Dust',
      duration: '30 mins',
      paymentMethod: 'Master Card',
      payment: '$60',
    },
  ];

  const [modalVisibility, setModalVisibility] = useState(false);

  const handleModalVisibility = () => setModalVisibility(!modalVisibility);

  return (
    <View height="100%" scroll spacing={{ pt: 5 }}>
      <FlatList
        data={sessionHistory}
        renderItem={({ item }) => (
          <View row variant="borderBottom" spacing={{ py: 3 }}>
            <View flex={1} column justifyCenter variant="borderRight" spacing={{ p: 2 }} width={90}>
              <Text typography={{ size: 5, color: 'secondary', weight: '300' }} spacing={{ ml: 3, pb: 2 }}>{item.day}</Text>
              <Text typography={{ size: 2, color: 'secondary', weight: '500' }}>
                {item.month}
                {' '}
                /
              {' '}
                {item.year}
              </Text>
            </View>
            <View flex={3} column justifyEnd variant="borderRight" spacing={{ m: 2 }} width={250}>
              <Text variant="titleSmall" spacing={{ ml: 2 }}>{item.therapist}</Text>
              <View row spacing={{ my: 2 }}>
                <View row spacing={{ mx: 1 }}>
                  <ClockIcon />
                  <Text variant="regular" spacing={{ mx: 1 }}>{item.duration}</Text>
                </View>
                <View row spacing={{ mx: 1 }}>
                  <CreditCardIcon />
                  <Text variant="regular" spacing={{ mx: 1 }}>{item.paymentMethod}</Text>
                </View>
              </View>
            </View>
            <View flex={1} alignCenter justifyCenter spacing={{ m: 2 }} width={80} onPress={handleModalVisibility}>
              <NoteIcon />
            </View>
          </View>
        )}
        keyExtractor={({ id }) => id}
      />
      {/* <AddNoteModal modalVisibility={modalVisibility} handleArrowClick={handleModalVisibility} /> */}
    </View>
  );
};

export default NotesTab;
