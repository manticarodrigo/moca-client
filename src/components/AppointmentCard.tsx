import React, { useMemo } from 'react';
import { format, differenceInHours } from 'date-fns';

import { openMapMarker } from '@src/utlities/maps';

import { AppointmentStatusEnum } from '@src/services/openapi';

import useStore from '@src/hooks/useStore';

import { UserState } from '@src/store/reducers/UserReducer';
import { Appointment } from '@src/store/reducers/AppointmentReducer';

import { MessagesIcon, PinIcon } from '@src/components/icons';

import View from './View';
import Text from './Text';
import Button from './Button';
import AppointmentHeader from './AppointmentHeader';
import NotificationBadge from './NotificationBadge';

type AppointmentCardProps = {
  appointment?: Appointment;
  current?: boolean;
  upcoming?: boolean;
  past?: boolean;
  onPress?: (appointment: Appointment) => void;
  onPressBtn?: (appointment: Appointment) => void;
  onMessageUser: (user: UserState) => void;
};

const AppointmentCard = ({
  appointment,
  current,
  upcoming,
  past,
  onPress,
  onPressBtn,
  onMessageUser,
}: AppointmentCardProps) => {
  const { status, startTime, endTime, address, otherParty } = appointment;

  const { store } = useStore();

  const isTherapist = store.user.type === 'PT';
  const isCancelled = status === AppointmentStatusEnum.Cancelled;

  const {
    canCancel,
    canEditNotes,
    canEditReview,
    time,
  } = useMemo(() => ({
    canCancel: !past && upcoming,
    canEditNotes: past && isTherapist,
    canEditReview: past && !isTherapist,
    time: format(new Date(startTime), `MM/dd${past ? '/yy' : ''} - hh:mm aaaa`),
  }), [upcoming, past, isTherapist, startTime]);

  const variant = useMemo(() => {
    if (upcoming) {
      return 'card';
    }

    if (past) {
      return 'borderBottom';
    }

    return 'borderCard';
  }, [upcoming, past]);

  const hasButton = !isCancelled && (canCancel || canEditNotes || canEditReview);

  const shouldShowButton = useMemo(() => {
    if (!isTherapist) return true;

    const endDate = new Date(endTime);
    const hoursSinceEnd = differenceInHours(new Date(), endDate);

    if (hoursSinceEnd <= 48) {
      return true;
    }

    return false;
  }, [isTherapist, endTime]);

  const handlePress = () => onPress(appointment);

  const handlePressBtn = () => onPressBtn(appointment);

  const handlePressChat = () => onMessageUser(appointment.otherParty);

  const handlePressLocation = () => {
    const label = `${otherParty.firstName}'s Location`;
    const [lat, lng] = address.location.coordinates;

    openMapMarker(label, lat, lng);
  };

  return (
    <View
      row
      variant={variant}
      p={past && 3}
      bgColor={upcoming ? 'whiteTranslucent' : 'white'}
      onPress={onPress && handlePress}
    >
      <AppointmentHeader
        showInfo
        current={current}
        upcoming={upcoming}
        appointment={appointment}
        isTherapist={isTherapist}
        onMessageUser={onMessageUser}
      >
        <View row justifyBetween py={isTherapist && !upcoming && 2}>
          <View row flex={1}>
            <View column flex={1} mt={(isTherapist && upcoming) && -5}>
              {isCancelled && (
                <Text variant="semiBold" color="error">
                  Cancelled
                </Text>
              )}
              <Text
                variant="semiBoldLarge"
                color={!upcoming && isTherapist ? 'secondary' : 'grey'}
              >
                {time}
              </Text>
              <Text variant="regular">{address.street}</Text>
            </View>
          </View>

          {!upcoming && (
            <View row>
              <View variant="iconButton" onPress={handlePressChat}>
                <MessagesIcon size={0.5} />
                <NotificationBadge />
              </View>
              {isTherapist && (
                <View ml={2} variant="iconButton" onPress={handlePressLocation}>
                  <PinIcon size={0.8} />
                </View>
              )}
            </View>
          )}
        </View>

        {hasButton && shouldShowButton && (
          <Button
            mt={3}
            variant="secondary"
            bgColor={canCancel ? 'white' : null}
            onPress={handlePressBtn}
          >
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
