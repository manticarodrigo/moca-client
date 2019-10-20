import React from 'react';

import { mockImg } from '@src/services/mock';

import {
  ClockIcon,
  InfoIcon,
  MessagesIcon,
  PinIcon,
} from '@src/components/icons';

import View from './View';
import Image from './Image';
import Text from './Text';
import Button from './Button';
import NotificationBadge from './NotificationBadge';

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
          <NotificationBadge />
        </View>
        <View variant="iconButton" spacing={{ ml: 2 }} onPress={() => null}>
          <PinIcon size={0.8} />
        </View>
      </View>
    )}
  </View>
);

type AppointmentCardProps = {
  current?: boolean;
  isTherapist: boolean;
  onPress?: () => void;
};

const AppointmentCard = ({ current, isTherapist, onPress }: AppointmentCardProps) => {
  const canStart = current && isTherapist;
  const canCancel = !current && !isTherapist;
  const hasButton = canStart || canCancel;

  return (
    <View
      column
      variant={current ? 'borderCard' : 'card'}
      spacing={{ pb: (!current && isTherapist) && 0 }}
      bgColor={!current ? 'whiteTranslucent' : null}
      onPress={onPress}
    >
      <AppointmentCardHeader />

      <AppointmentCardInfo current={current} />

      {hasButton && (
        <View row justifyCenter spacing={{ mt: 2, ml: 5 }}>
          <Button variant="secondary" bgColor={canCancel ? 'white' : null} onPress={() => null}>
            {canStart && 'Begin Session'}
            {canCancel && 'Cancel Appointment'}
          </Button>
        </View>
      )}
    </View>
  );
};

export default AppointmentCard;
