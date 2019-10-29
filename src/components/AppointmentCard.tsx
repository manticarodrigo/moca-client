import React, { useMemo } from 'react';

import { format, differenceInMinutes } from 'date-fns';

import { mockImg } from '@src/services/mock';

import useStore from '@src/hooks/useStore';

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
  past?: boolean;
  onPress?: () => void;
  onPressBtn?: () => void;
};

const AppointmentCard = ({
  appointment,
  current,
  past,
  onPress,
  onPressBtn,
}: AppointmentCardProps) => {
  const { otherParty, startTime, endTime, price, review, address } = appointment;

  const { store } = useStore();

  const isTherapist = store.user.type === 'PT';

  const {
    canStart,
    canCancel,
    canEditNotes,
    canEditReview,
    duration,
    time,
    rating,
  } = useMemo(() => ({
    canStart: !past && current && isTherapist,
    canCancel: !past && !current && !isTherapist,
    canEditNotes: past && isTherapist,
    canEditReview: past && !isTherapist,
    duration: differenceInMinutes(new Date(endTime), new Date(startTime)),
    time: format(new Date(startTime), `MM/dd${past ? '/yy' : ''} - hh:mm aaaa`),
    rating: (review || {}).rating,
  }), [current, past, isTherapist, startTime, endTime, review]);

  const hasButton = canStart || canCancel || canEditNotes || canEditReview;

  return (
    <View
      row
      variant={current ? 'borderCard' : 'card'}
      spacing={{ pb: (!past && !current && isTherapist) && 0 }}
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
            {`${otherParty.firstName} ${otherParty.lastName}`}
          </Text>
          <View row>
            <ClockIcon />
            <Text variant="regularSmall" spacing={{ ml: 1 }}>
              {`${duration}min`}
            </Text>
          </View>
        </View>
        <View
          row
          justifyEnd={isTherapist}
          justifyBetween={!isTherapist}
          spacing={{ py: 1 }}
        >
          {!isTherapist && <Rating rating={rating} />}
          <Text variant="titlePrimaryLarge">
            {`$${price}`}
          </Text>
        </View>
        <View row justifyBetween spacing={{ py: isTherapist && current && 2 }}>
          <View row flex={1}>
            <View column flex={1} spacing={{ mt: (isTherapist && !current) && -5 }}>
              <Text variant={current && isTherapist ? 'boldSecondary' : 'boldGrey'}>
                {time}
              </Text>
              <Text variant="regular">{address.street}</Text>
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
            onPress={onPressBtn}
          >
            {canStart && 'Begin Session'}
            {canCancel && 'Cancel Appointment'}
            {canEditNotes && 'Edit Notes'}
            {canEditReview && 'Edit Review'}
          </Button>
        )}
      </View>
    </View>
  );
};

export default AppointmentCard;
