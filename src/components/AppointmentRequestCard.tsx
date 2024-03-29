import React, { useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { format, differenceInMinutes } from 'date-fns';

import useStore from '@src/hooks/useStore';

import { Message } from '@src/store/reducers/ConversationReducer';
import { UserSnippet } from '@src/services/openapi';

import ConsentModal from '@src/modals/ConsentModal';

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
  const [consentVisible, setConsentVisible] = useState(false);

  const { id, endTime, price, startTime, status } = message.content;

  const isTherapist = store.user.type === 'PT';
  const isRejected = status === 'rejected';
  const isCancelled = status === 'cancelled';


  const { date, hour, duration } = useMemo(() => ({
    date: format(new Date(startTime), 'MM dd yyyy'),
    hour: format(new Date(startTime), 'hh:mm aaaa'),
    duration: differenceInMinutes(new Date(endTime), new Date(startTime)),
  }), [startTime, endTime]);

  const onCloseConsent = () => setConsentVisible(false);
  const onAcceptConsent = () => {
    onPressAnswer(id, 'accept');
    onCloseConsent();
  };

  const onPressAccept = () => setConsentVisible(true);
  const onPressReject = () => {
    const ptMsg = 'You will have to create a new appointment request if you cancel this one.';
    const paMsg = 'You will have to ask for a new appointment request if you reject this one.';
    Alert.alert(
      'Are you sure?',
      isTherapist ? ptMsg : paMsg,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Submit', onPress: () => onPressAnswer(id, isTherapist ? 'cancel' : 'reject') },
      ],
    );
  };

  return (
    <>
      <ConsentModal
        visible={consentVisible}
        ptName={`${otherUser.firstName} ${otherUser.lastName}`}
        onAccept={onAcceptConsent}
        onClose={onCloseConsent}
      />
      <View
        m={3}
        mt={0}
        style={{ overflow: 'hidden' }}
        variant="rounded"
        bgColor="white"
      >

        <View alignCenter p={3}>
          <Text variant="regularDark">
            Appointment request
            {' '}
            {isTherapist ? 'for' : 'from'}
            {' '}
            <Text variant="semiBoldLarge" color="dark">
              {`${otherUser.firstName} ${otherUser.lastName}`}
            </Text>
          </Text>
        </View>

        <View alignCenter p={3} bgColor="secondaryLight">
          <View row alignCenter ml={-3}>
            <ScheduleTabIcon white />
            <Text variant="bold">
              {date}
            </Text>
          </View>
          <View row alignCenter m={1}>
            <ClockIcon white />
            <Text variant="bold" ml={2}>
              {hour}
            </Text>
          </View>
          <Text variant="title" weight="900" size={5} color="white" mt={2}>
            {`$${price} for ${duration}min`}
          </Text>

          {(!isTherapist && status === 'pending') && (
            <Button mt={3} variant="primary" onPress={onPressAccept}>
              Accept Appointment
            </Button>
          )}

        </View>
        <View
          alignCenter
          p={4}
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
    </>
  );
};

export default AppointmentRequestCard;
