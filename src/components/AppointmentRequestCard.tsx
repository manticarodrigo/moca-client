import React, { useMemo } from 'react';
import { format, differenceInMinutes } from 'date-fns';

import useStore from '@src/hooks/useStore';

import { Message } from '@src/store/reducers/ConversationReducer';
import { UserSnippet } from '@src/services/openapi';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Button from '@src/components/Button';

import { ScheduleTabIcon, ClockIcon } from '@src/components/icons';

type Props = {
  message: Message;
  otherUser: UserSnippet;
  onPressAnswer: (id: number, status: 'accept' | 'reject' | 'cancel') => void;
};

const AppointmentRequestCard = ({ message, otherUser, onPressAnswer }: Props) => {
  const { store } = useStore();

  const { id, endTime, price, startTime, status } = message.content;

  const isTherapist = store.user.type === 'PT';
  const isRejected = status === 'rejected';
  const isCancelled = status === 'cancelled';


  const { date, hour, duration } = useMemo(() => ({
    date: format(new Date(startTime), 'MM dd yyyy'),
    hour: format(new Date(startTime), 'hh:mm aaaa'),
    duration: differenceInMinutes(new Date(endTime), new Date(startTime)),
  }), [startTime, endTime]);

  const onPressAccept = () => onPressAnswer(id, 'accept');

  const onPressReject = () => onPressAnswer(id, isTherapist ? 'cancel' : 'reject');

  return (
    <View
      style={{ overflow: 'hidden' }}
      spacing={{ m: 3, mt: 0 }}
      variant="rounded"
      bgColor="white"
    >

      <View alignCenter spacing={{ p: 3 }}>
        <Text variant="regularDark">
          Appointment request
          {' '}
          {isTherapist ? 'for' : 'from'}
          {' '}
          <Text variant="semiBold" color="dark">
            {`${otherUser.firstName} ${otherUser.lastName}`}
          </Text>
        </Text>
      </View>

      <View alignCenter spacing={{ p: 3 }} bgColor="secondaryLight">
        <View row alignCenter spacing={{ ml: -3 }}>
          <ScheduleTabIcon white />
          <Text variant="bold">
            {date}
          </Text>
        </View>
        <View row alignCenter spacing={{ m: 1 }}>
          <ClockIcon white />
          <Text variant="bold" ml={2}>
            {hour}
          </Text>
        </View>
        <Text variant="title" weight="900" size={5} color="white" mt={2}>
          {`$${price} for ${duration}min`}
        </Text>

        {(!isTherapist && status === 'pending') && (
          <Button variant="primary" spacing={{ mt: 3 }} onPress={onPressAccept}>
            Accept Appointment
          </Button>
        )}

      </View>
      <View
        alignCenter
        spacing={{ p: 4 }}
        bgColor={(isCancelled || isRejected) ? 'error' : null}
        onPress={(!isCancelled && !isRejected) && onPressReject}
      >
        <Text
          variant="title"
          color={(isCancelled || isRejected) ? 'white' : 'error'}
        >
          {isCancelled && 'Cancelled'}
          {isRejected && 'Rejected'}
          {(
            !isCancelled && !isRejected) && (
            (isTherapist && 'Cancel') || (!isTherapist && 'Reject')
          )}
        </Text>
      </View>
    </View>
  );
};

export default AppointmentRequestCard;
