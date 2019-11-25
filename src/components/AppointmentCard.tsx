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
  onPressBtn?: (appointment: Appointment) => void;
  onMessageUser: (user: UserState) => void;
};

const AppointmentCard = ({
  appointment,
  current,
  upcoming,
  past,
  onPressBtn,
  onMessageUser,
}: AppointmentCardProps) => {
  const { status, startTime, endTime, address, otherParty } = appointment;

  const { store } = useStore();

  const isTherapist = store.user.type === 'PT';
  const isCancelled = status === AppointmentStatusEnum.Cancelled;
  const notStarted = status === AppointmentStatusEnum.NotStarted;
  const inProgress = status === AppointmentStatusEnum.InProgress;
  const paymentFailed = status === AppointmentStatusEnum.PaymentFailed;

  const notesTimeLeft = useMemo(() => {
    const endDate = new Date(endTime);
    const hoursSinceEnd = differenceInHours(new Date(), endDate);

    let _notesTimeLeft = 48;
    if (hoursSinceEnd > 0) {
      _notesTimeLeft = Math.max(48 - hoursSinceEnd, 0);
    }

    return _notesTimeLeft;
  }, [endTime]);

  const {
    canCancel,
    canBegin,
    canEnd,
    canView,
    canEditNote,
    canViewNote,
    canEditReview,
    time,
  } = useMemo(() => ({
    canCancel: upcoming,
    canBegin: current && isTherapist && notStarted,
    canEnd: current && isTherapist && inProgress,
    canView: current && !isTherapist,
    canEditNote: past && isTherapist && notesTimeLeft > 0,
    canViewNote: past && isTherapist && notesTimeLeft <= 0,
    canEditReview: past && !isTherapist,
    time: format(new Date(startTime), `MM/dd${past ? '/yy' : ''} - hh:mm aaaa`),
  }), [upcoming, current, past, isTherapist, notStarted, inProgress, startTime, notesTimeLeft]);

  const variant = useMemo(() => {
    if (upcoming) {
      return 'card';
    }

    if (past) {
      return 'borderBottom';
    }

    return 'borderCard';
  }, [upcoming, past]);

  const hasButton = !isCancelled && (
    canCancel
    || canBegin
    || canEnd
    || canView
    || canEditNote
    || canViewNote
    || canEditReview
  );

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
              {paymentFailed && (
                <Text variant="semiBold" color="error">
                  Payment Failed
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

        {hasButton && (
          <Button
            mt={3}
            variant="secondary"
            bgColor={canCancel ? 'white' : null}
            subtitle={canEditNote
              ? <Text variant="lightSmallest" align="center">{`${notesTimeLeft}h left`}</Text>
              : undefined}
            onPress={handlePressBtn}
          >
            {canCancel && 'Cancel Session'}
            {canBegin && 'Begin Session'}
            {canEnd && 'End Session'}
            {canView && 'View Timer'}
            {canEditNote && 'Edit Note'}
            {canViewNote && 'View Note'}
            {canEditReview && 'Edit Review'}
          </Button>
        )}
      </AppointmentHeader>
    </View>
  );
};

export default AppointmentCard;
