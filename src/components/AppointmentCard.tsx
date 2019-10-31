import React, { useMemo } from 'react';

import { format } from 'date-fns';

import useStore from '@src/hooks/useStore';

import { Appointment } from '@src/store/reducers/AppointmentReducer';

import { MessagesIcon, PinIcon } from '@src/components/icons';

import View from './View';
import Text from './Text';
import Button from './Button';
import AppointmentHeader from './AppointmentHeader';
import NotificationBadge from './NotificationBadge';

type AppointmentCardProps = {
  appointment?: Appointment;
  upcoming?: boolean;
  past?: boolean;
  onPress?: (appointment: Appointment) => void;
  onPressBtn?: (appointment: Appointment) => void;
};

const AppointmentCard = ({
  appointment,
  upcoming,
  past,
  onPress,
  onPressBtn,
}: AppointmentCardProps) => {
  const { startTime, address } = appointment;

  const { store } = useStore();

  const isTherapist = store.user.type === 'PT';

  const {
    canStart,
    canCancel,
    canEditNotes,
    canEditReview,
    time,
  } = useMemo(() => ({
    canStart: !past && !upcoming && isTherapist,
    canCancel: !past && upcoming && !isTherapist,
    canEditNotes: past && isTherapist,
    canEditReview: past && !isTherapist,
    time: format(new Date(startTime), `MM/dd${past ? '/yy' : ''} - hh:mm aaaa`),
  }), [upcoming, past, isTherapist, startTime]);

  const hasButton = canStart || canCancel || canEditNotes || canEditReview;

  const handlePress = () => onPress(appointment);

  const handlePressBtn = () => onPressBtn(appointment);

  return (
    <View
      row
      variant={!upcoming ? 'borderCard' : 'card'}
      spacing={{ pb: (!past && upcoming && isTherapist) && 0 }}
      bgColor={upcoming ? 'whiteTranslucent' : undefined}
      onPress={handlePress}
    >
      <AppointmentHeader
        showInfo
        upcoming={upcoming}
        isTherapist={isTherapist}
        appointment={appointment}
      >
        <View row justifyBetween spacing={{ py: isTherapist && !upcoming && 2 }}>
          <View row flex={1}>
            <View column flex={1} spacing={{ mt: (isTherapist && upcoming) && -5 }}>
              <Text variant={!upcoming && isTherapist ? 'boldSecondary' : 'boldGrey'}>
                {time}
              </Text>
              <Text variant="regular">{address.street}</Text>
            </View>
          </View>

          {!upcoming && isTherapist && (
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
            onPress={handlePressBtn}
          >
            {canStart && 'Begin Session'}
            {canCancel && 'Cancel Appointment'}
            {canEditNotes && 'Edit Notes'}
            {canEditReview && 'Edit Review'}
          </Button>
        )}
      </AppointmentHeader>
    </View>
  );
};

export default AppointmentCard;
