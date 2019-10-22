import React from 'react';

import { format, differenceInMinutes } from 'date-fns';

import { mockImg } from '@src/services/mock';

import { Appointment } from '@src/store/reducers/AppointmentReducer';

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
  appointment?: Appointment;
  current?: boolean;
  isTherapist: boolean;
  onPress?: () => void;
};

const AppointmentCard = ({ appointment, current, isTherapist, onPress }: AppointmentCardProps) => {
  const canStart = current && isTherapist;
  const canCancel = !current && !isTherapist;
  const hasButton = canStart || canCancel;

  return (
    <View
      row
      variant={current ? 'borderCard' : 'card'}
      spacing={{ pb: (!current && isTherapist) && 0 }}
      bgColor={!current ? 'whiteTranslucent' : null}
      onPress={onPress}
    >
      <View>
        <Image rounded size={48} uri={mockImg} />
        <View width={48} height={48} justifyCenter alignCenter>
          <InfoIcon />
        </View>
      </View>
      <View flex={1} spacing={{ pl: 3 }}>
        <View row justifyBetween>
          <Text variant={current ? 'title' : 'titleSmall'} numberOfLines={2}>
            {`${appointment.otherParty.firstName} ${appointment.otherParty.lastName}`}
          </Text>
          <View row>
            <ClockIcon />
            <Text variant="regularSmall" spacing={{ ml: 1 }}>
              {differenceInMinutes(new Date(appointment.endTime), new Date(appointment.startTime))}
              min
            </Text>
          </View>
        </View>
        <View row justifyEnd={isTherapist} justifyBetween={!isTherapist} spacing={{ py: 1 }}>
          {!isTherapist && <Rating rating={2} />}
          <Text variant="titlePrimaryLarge">
            $
            {appointment.price}
          </Text>
        </View>
        <View row justifyBetween spacing={{ py: isTherapist && current && 2 }}>
          <View row flex={1}>
            <View column flex={1} spacing={{ mt: (isTherapist && !current) && -5 }}>
              <Text variant={current && isTherapist ? 'boldSecondary' : 'boldGrey'}>
                {format(new Date(appointment.startTime), 'hh:mm aaaa')}
              </Text>
              <Text variant="regular">{appointment.address.street}</Text>
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
          <Button
            variant="secondary"
            spacing={{ mt: 3 }}
            bgColor={canCancel ? 'white' : null}
            onPress={() => null}
          >
            {canStart && 'Begin Session'}
            {canCancel && 'Cancel Appointment'}
          </Button>
        )}
      </View>
    </View>
  );
};

export default AppointmentCard;
