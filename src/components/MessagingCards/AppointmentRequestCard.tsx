import React from 'react';

import { format, differenceInMinutes } from 'date-fns';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Button from '@src/components/Button';

import { ScheduleTabIcon, ClockIcon } from '@src/components/icons';


type Content = {
  id: number;
  endTime: string;
  price: number;
  startTime: string;
  status: 'accepted' | 'rejected';
}

type Props = {
  content?: Content;
};

const AppointmentRequestCard = ({ content }: Props) => {
  const { id, endTime, price, startTime, status } = content;

  const handlePress = () => {
    // handle appointment acception.
  };

  return (
    <View variant="curveBorder" bgColor="white" spacing={{ m: 4 }}>
      <View alignCenter spacing={{ p: 3 }}>
        <Text variant="regularDark">
         Appointment Created
        </Text>
      </View>
      <View alignCenter bgColor="secondaryLight" spacing={{ p: 4 }}>
        <View row alignCenter spacing={{ m: 1 }}>
          <ScheduleTabIcon white />
          <Text variant="regularPrimaryBold">
            {format(new Date(startTime), 'MM dd yyyy')}
          </Text>
        </View>
        <View row alignCenter spacing={{ m: 1 }}>
          <ClockIcon white />
          <Text variant="regularPrimaryBold" spacing={{ ml: 2 }}>
            {format(new Date(startTime), 'hh:mm aaaa')}
          </Text>
        </View>
        <Text variant="titleWhiteBold" spacing={{ mt: 2 }}>
          $
          {price}
          {' '}
          for
          {' '}
          {differenceInMinutes(new Date(endTime), new Date(startTime))}
          min
        </Text>
        {/* {(isPatient && rejected === false)
          ? <Button variant="primary" spacing={{ mt: 3 }} onPress={handlePress}>Accept Appointment</Button> : null} */}
      </View>
      <View
        variant="curveBorderBottom"
        alignCenter
        spacing={{ p: 4 }}
        bgColor={status === 'rejected' ? 'error' : null}
        onPress={handlePress}
      >
        {/* <Text variant={rejected ? 'titleWhite' : 'titleSmallError'}>
          {((isPatient && rejected === false) ? 'Reject' : (rejected ? 'Rejected' : 'Cancel'))}
        </Text> */}
        <Text variant="titlePrimary">
          Accepted
        </Text>
      </View>
    </View>
  );
};

export default AppointmentRequestCard;
