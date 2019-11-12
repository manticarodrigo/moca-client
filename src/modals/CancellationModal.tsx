import React, { useState } from 'react';

import { AppointmentCancellationTypeEnum } from '@src/services/openapi';
import { cancelAppointment } from '@src/store/actions/AppointmentAction';

import useStore from '@src/hooks/useStore';

import { ArrowDown, ArrowUp } from '@src/components/icons';

import Modal from '@src/components/Modal';
import View from '@src/components/View';
import Text from '@src/components/Text';
import Checkbox from '@src/components/Checkbox';
import Button from '@src/components/Button';
import Toast from '@src/components/Toast';

const cancellationReasons = {
  standard: {
    title: 'Standard Cancellation Policy',
    details: 'For a full refund, cancel at least 24 hours before your session is scheduled to begin. If cancelling within 24 hours of the scheduled session, you will be charged 50% of the agreed-upon session cost.',
  },
  rescheduling: {
    title: 'Rescheduling',
    details: 'You can reschedule the date or time of your session up to 48 hours before the session is scheduled to start. If you reschedule the session, the cancellation policy is based on the original purchase time and original start date of the experience.',
  },
  weather: {
    title: 'Cancellation Due to Weather',
    details: 'For a full refund, cancel at least 24 hours before your session is scheduled to begin. If cancelling within 24 hours of the scheduled session, you will be charged 50% of the agreed-upon session cost.',
  },
  emergency: {
    title: 'Cancellation Due to an Emergency',
    details: 'For a full refund, cancel at least 24 hours before your session is scheduled to begin. If cancelling within 24 hours of the scheduled session, you will be charged 50% of the agreed-upon session cost.',
  },
};

type ToastState = {
  type: 'success' | 'error';
  message: string;
}

const CancellationModal = ({ visible, appointmentId, onToggle, onSubmit }) => {
  const { store, dispatch } = useStore();
  const [opened, setOpened] = useState<{ [key in AppointmentCancellationTypeEnum]: boolean }>({
    standard: false,
    reschedule: false,
    weather: false,
    emergency: false,
  });
  const [checked, setChecked] = useState<AppointmentCancellationTypeEnum>();
  const [toastState, setToastState] = useState<ToastState>();

  const isTherapist = store.user.type === 'PT';


  const onPressAccordion = (key) => setOpened({ ...opened, [key]: !opened[key] });

  const onClickCheckbox = (key) => setChecked(key !== checked ? key : undefined);

  const onPressSubmit = async () => {
    try {
      await dispatch(cancelAppointment(appointmentId, checked));

      setToastState({ type: 'success', message: 'Appointment cancelled successfully.' });
      setTimeout(onSubmit, 2000);
    } catch (e) {
      const { detail } = e.response.data;
      setToastState({ type: 'error', message: detail || 'Failed to cancel Appointment.' });
    }
  };

  return (
    <Modal
      propagateSwipe
      isVisible={visible}
      onToggle={onToggle}
    >
      <View
        alignCenter
        p={4}
        variant="borderBottom"
        width="100%"
        bgColor="white"
      >
        <Text variant="title" color="dark">Choose your reason</Text>
        <Text variant="title" color="dark">for cancellation.</Text>
      </View>
      <View scroll width="100%" flex={0} p={4}>
        <View>
          {Object.entries(cancellationReasons).map(([key, reason]) => (
            <View
              key={reason.title}
              my={1}
              p={3}
              variant="roundedBorderGrey"
              onPress={() => onPressAccordion(key)}
            >
              <View row>
                <View row alignCenter>
                  <Checkbox
                    checked={checked === key}
                    onChange={() => onClickCheckbox(key)}
                  />
                </View>
                <View justifyCenter flex={1} px={3}>
                  <Text numberOfLines={2} variant="semiBoldLarge" color="dark">
                    {reason.title}
                  </Text>
                </View>
                {!isTherapist && (
                  <View justifyCenter>
                    {opened[key] ? <ArrowUp /> : <ArrowDown />}
                  </View>
                )}
              </View>
              {!isTherapist && opened[key] && (
                <Text variant="light" color="dark" mt={2}>{reason.details}</Text>
              )}
            </View>
          ))}
        </View>
        <View py={4} pb={6}>
          <Button
            variant={!checked ? 'primaryDisabled' : 'primary'}
            disabled={!checked}
            onPress={onPressSubmit}
          >
            Continue
          </Button>
        </View>
      </View>

      {!!toastState && (
        <Toast error={toastState.type === 'error'} onClose={() => setToastState(undefined)}>
          {toastState.message}
        </Toast>
      )}
    </Modal>
  );
};

export default CancellationModal;
