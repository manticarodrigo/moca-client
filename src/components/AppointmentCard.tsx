import React from 'react';

import { mockImg } from '@src/services/mock';

import {
  ClockIcon,
  InfoIcon,
  MessagesIcon,
  PinIcon,
} from './icons';

import View from './View';
import Image from './Image';
import Text from './Text';
import Button from './Button';

const AppointmentCardHeader = () => (
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
);

const AppointmentCardInfo = ({ current = false }) => (
  <View row justifyBetween spacing={{ mt: current ? 2 : -2 }}>
    <View row flex={1}>
      <View width={48} height={48} justifyCenter alignCenter>
        <InfoIcon />
      </View>
      <View column flex={1} spacing={{ mt: !current && -3, ml: 3 }}>
        <Text variant={current ? 'boldSecondary' : 'boldGrey'}>12:00pm / Today</Text>
        <Text variant="regular">Chestnut St.</Text>
      </View>
    </View>

    {current && (
      <View row>
        <View variant="iconButton" onPress={() => null}>
          <MessagesIcon size={0.5} />
        </View>
        <View variant="iconButton" spacing={{ ml: 2 }} onPress={() => null}>
          <PinIcon size={0.8} />
        </View>
      </View>
    )}
  </View>
);

const AppointmentCardButton = () => (
  <View row justifyCenter spacing={{ mt: 2, ml: 5 }}>
    <Button variant="secondary">Begin Session</Button>
  </View>
);

const CancelAppointmentButton = () => (
  <View row justifyCenter spacing={{ mt: 2, ml: 5 }}>
    <Button variant="secondary">Cancel Appointment</Button>
  </View>
);

type AppointmentCardProps = {
  current?: boolean;
  isTherapist: boolean;
};

const AppointmentCard = ({ current, isTherapist }: AppointmentCardProps) => {
  const isStart = current && isTherapist;
  const isCancel = !current && !isTherapist;
  const isButton = isStart || isCancel;
  return (
    <View
      column
      variant={current ? 'borderCard' : 'card'}
      spacing={{ pb: !isButton && 0 }}
      bgColor={!isButton ? 'whiteTranslucent' : null}
    >
      <AppointmentCardHeader />

      <AppointmentCardInfo current={current} />

      {isStart && <AppointmentCardButton />}
      {isCancel && <CancelAppointmentButton />}
    </View>
  );
};

export default AppointmentCard;
