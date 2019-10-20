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
import Rating from './Rating';
import NotificationBadge from './NotificationBadge';

type AppointmentCardProps = {
  current?: boolean;
  isTherapist: boolean;
};

const AppointmentCard = ({ current, isTherapist }: AppointmentCardProps) => {
  const canStart = current && isTherapist;
  const canCancel = !current && !isTherapist;
  const hasButton = canStart || canCancel;

  return (
    <View
      row
      variant={current ? 'borderCard' : 'card'}
      spacing={{ pb: (!current && isTherapist) && 0 }}
      bgColor={!current ? 'whiteTranslucent' : null}
    >
      <View>
        <Image rounded size={48} uri={mockImg} />
        <View width={48} height={48} justifyCenter alignCenter>
          <InfoIcon />
        </View>
      </View>
      <View flex={1} spacing={{ pl: 3 }}>
        <View row justifyBetween>
          <Text variant="titleSmall">
            Elvis Presley
          </Text>
          <View row>
            <ClockIcon />
            <Text variant="regularSmall" spacing={{ ml: 1 }}>
              30 min
            </Text>
          </View>
        </View>
        <View row justifyEnd={isTherapist} justifyBetween={!isTherapist} spacing={{ py: 1 }}>
          {!isTherapist && <Rating rate="2" />}
          <Text variant="title">$60</Text>
        </View>
        <View row justifyBetween>
          <View row flex={1}>
            <View column flex={1} spacing={{ mt: (isTherapist && !current) && -5 }}>
              <Text variant={current && isTherapist ? 'boldSecondary' : 'boldGrey'}>
                12:00pm / Today
              </Text>
              <Text variant="regular">Chestnut St.</Text>
            </View>
          </View>

          {current && isTherapist && (
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

        {hasButton && (
          <Button variant="secondary" spacing={{ mt: 3 }} bgColor={canCancel ? 'white' : null} onPress={() => null}>
            {canStart && 'Begin Session'}
            {canCancel && 'Cancel Appointment'}
          </Button>
        )}
      </View>
    </View>
  );
};

export default AppointmentCard;
