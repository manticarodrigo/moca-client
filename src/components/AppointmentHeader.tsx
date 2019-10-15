import React from 'react';

import { mockImg } from '@src/services/mock';

import Image from './Image';
import View from './View';
import Text from './Text';


type AppointmentHeaderProps = {
  name: string;
  appointmentDuration: string;
  appointmentPrice: number;
}

const AppointmentHeader = ({
  name, appointmentDuration, appointmentPrice,

}: AppointmentHeaderProps) => (
  <View row width="100%" variant="borderBottom">
    <View row spacing={{ m: 3 }} justifyBetween flex={1}>
      <View row justifyCenter>
        <View spacing={{ mr: 2 }}>
          <Image rounded size={60} uri={mockImg} />
        </View>
        <View spacing={{ mt: 3 }}>
          <Text variant="titleSmall">
            {name}
          </Text>
        </View>
      </View>
    </View>
    <View justifyCenter spacing={{ mr: 3 }}>
      <Text variant="regularGrey">{`${appointmentDuration} mins`}</Text>
      <Text variant="title">{`$${appointmentPrice}`}</Text>
    </View>
  </View>
);


export default AppointmentHeader;
