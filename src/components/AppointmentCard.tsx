import React from 'react';

import { mockImg } from '@src/services/mock';

import {
  ClockIcon,
  InfoIcon,
  ChatIcon,
  PinIcon,
} from './icons';

import View from './View';
import Image from './Image';
import Text from './Text';
import Button from './Button';

const AppointmentCard = () => (
  <View column variant="borderCard">
    <View row justifyBetween>
      <View row>
        <Image rounded size={48} uri={mockImg} />
        <Text variant="titleSmall" spacing={{ ml: 3 }}>
          Elvis Presley
        </Text>
      </View>
      <View column alignEnd>
        <View row spacing={{ mb: 1 }}>
          <ClockIcon />
          <Text variant="regularSmall" spacing={{ ml: 1 }}>
            30 min
          </Text>
        </View>
        <Text variant="title">$60</Text>
      </View>
    </View>

    <View row justifyBetween spacing={{ mt: 2 }}>
      <View row>
        <View width={48} height={48} justifyCenter alignCenter>
          <InfoIcon />
        </View>
        <View column spacing={{ ml: 3 }}>
          <Text variant="boldSecondary">12:00pm / Today</Text>
          <Text variant="regular">Chestnut St.</Text>
        </View>
      </View>
      <View row>
        <View variant="iconButton" onPress={() => null}>
          <ChatIcon />
        </View>
        <View variant="iconButton" spacing={{ ml: 2 }} onPress={() => null}>
          <PinIcon />
        </View>
      </View>
    </View>

    <View row justifyCenter spacing={{ mt: 2, ml: 5 }}>
      <Button variant="secondary">Begin Session</Button>
    </View>
  </View>
);

export default AppointmentCard;
