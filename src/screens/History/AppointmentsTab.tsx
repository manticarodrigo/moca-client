import React, { useState } from 'react';

import { format } from 'date-fns';

import { InfoIcon, ClockIcon, CheckedIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';
import Rating from '@src/components/Rating';
import Button from '@src/components/Button';
import AddNoteModal from './AddNoteModal';


const AppointmentsTab = () => {
  const appointments = [
    {
      patientName: 'john Doe',
      patientRating: '2',
      StartTime: '1:00',
      EndTime: '1:30',
      Date: format(new Date(), 'eee'),
      Price: '$60',
      note: false,
      paid: true,
    },
    {
      patientName: 'john Doe',
      patientRating: '4',
      StartTime: '1:00',
      EndTime: '1:30',
      Date: format(new Date(), 'eee'),
      Price: '$130',
      note: true,
      paid: false,
    },
    {
      patientName: 'john Doe',
      patientRating: '3',
      StartTime: '1:00',
      EndTime: '1:30',
      Date: format(new Date(), 'eee'),
      Price: '$120',
      note: true,
      paid: true,
    },
  ];

  const [modalVisibility, setModalVisibility] = useState(false);

  const handleModalVisibility = () => {
    setModalVisibility(!modalVisibility);
  };

  return (
    <View scroll height="100%" bgColor="lightGrey" spacing={{ pt: 3 }}>
      {appointments.map((appointment, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={index} spacing={{ my: 2 }}>
          <Text variant="regular" spacing={{ mx: 3 }}>
            Today
          </Text>
          <View row variant="rounded" spacing={{ p: 3, mx: 3, my: 2 }} width="90%" bgColor="white">
            <View alignCenter flex={1}>
              <Image rounded size={60} />
              <View spacing={{ p: 2 }}>
                <InfoIcon />
              </View>
            </View>
            <View spacing={{ px: 3 }} flex={2}>
              <Text variant="titleSmall" spacing={{ mb: 1 }}>{appointment.patientName}</Text>
              <Rating rate={appointment.patientRating} />
              <Text variant="boldGrey" spacing={{ my: 1 }}>1:00 - 1:30 pm</Text>
              <Text variant="regular">Wed, August 19</Text>
            </View>
            <View alignEnd flex={1}>
              <View row>
                <View spacing={{ mr: 1 }}>
                  <ClockIcon />
                </View>
                <Text variant="regular">30 mins</Text>
              </View>
              <View row alignCenter spacing={{ my: 1 }}>
                {appointment.paid ? <CheckedIcon small /> : null}
                <Text variant="titlePrimaryLarge" spacing={{ pl: 1 }}>{appointment.Price}</Text>
              </View>
              <View row alignCenter spacing={{ mt: 2 }}>
                {appointment.note ? <CheckedIcon small /> : null}
                <Text variant="boldPrimary" spacing={{ pl: 1 }}>Report</Text>
              </View>
            </View>
          </View>
          {appointment.note ? null : <Button variant="primaryBorder" spacing={{ ml: 3 }} onPress={handleModalVisibility}>Edit Note</Button>}
          <AddNoteModal modalVisibility={modalVisibility} handleArrowClick={handleModalVisibility} />
        </View>
      ))}
    </View>
  );
};

export default AppointmentsTab;
