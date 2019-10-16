import React from 'react';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Button from '@src/components/Button';

import { ScheduleTabIcon, ClockIcon } from '@src/components/icons';


type AppointmentCardProps = {
  isPatient?: boolean,
};

const AppointmentRequestCard = ({ isPatient }: AppointmentCardProps) => {

  const appointmentExample = {
    patientName: 'Adele Dust',
    therapistName: 'John Denver',
    date: '16 july 2019',
    time: '1:00 pm',
    price: '$120',
    duration: '60 min',
    rejected: false,
  }

  const handlePress = () => {
    // handle appointment acception.
  };

  const { patientName, therapistName, date, time, price, duration, rejected } = appointmentExample;
  return (
    <View variant="curveBorder" bgColor="white" spacing={{ m: 4 }}>
      <View alignCenter spacing={{ p: 3 }}>
        <Text variant="regularDark">Waiting {' '}
          <Text variant="regularDarker">
            {isPatient ? patientName : therapistName}{','}
          </Text>
        </Text>
        <Text variant="regularDark" spacing={{ mt: 2 }}>Accept or Reject the appointment</Text>
      </View>
      <View alignCenter bgColor="secondaryLight" spacing={{ p: 4 }}>
        <View row alignCenter spacing={{ m: 1 }}>
          <ScheduleTabIcon white />
          <Text variant="regularPrimaryBold">{date} (today)</Text>
        </View>
        <View row alignCenter spacing={{ m: 1 }}>
          <ClockIcon white />
          <Text variant="regularPrimaryBold" spacing={{ ml: 2 }}>{time}</Text>
        </View>
        <Text variant="titleWhiteBold" spacing={{ mt: 2 }}>{price} for {duration}</Text>
        {(isPatient && rejected === false) ?
          <Button variant="primary" spacing={{ mt: 3 }} onPress={handlePress}>Accept Appointment</Button> : null
        }
      </View>
      <View variant="curveBorderBottom" alignCenter spacing={{ p: 4 }} bgColor={rejected ? "error" : null} onPress={handlePress}>
        <Text variant={rejected ? "titleWhite" : "titleSmallError"}>
          {((isPatient && rejected === false) ? 'Reject' : (rejected ? 'Rejected' : 'Cancel'))}
        </Text>
      </View>
    </View>
  );
};

export default AppointmentRequestCard;