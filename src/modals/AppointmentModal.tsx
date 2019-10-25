import React from 'react';

import { differenceInMinutes } from 'date-fns';

import Modal from '@src/components/Modal';
import View from '@src/components/View';
import AppointmentHeader from '@src/components/AppointmentHeader';

import ReviewScreen from '@src/screens/ReviewScreen/ReviewScreen';
import TimerScreen from '@src/screens/TimerScreen/TimerScreen';

const AppointmentModal = ({
  visible,
  isTherapist,
  appointment,
  sessionEnded,
  onSubmitEndSession,
  onSubmitReview,
  onClose,
}) => (
  <Modal isVisible={visible} onToggle={onClose}>
    {appointment && (
      <View>
        <AppointmentHeader
          appointmentPrice={appointment.price}
          name={`${appointment.otherParty.firstName} ${appointment.otherParty.lastName}`}
          appointmentDuration={
            differenceInMinutes(
              new Date(appointment.endTime),
              new Date(appointment.startTime),
            ).toString()
          }
        />
        {(!isTherapist && sessionEnded)
          ? <ReviewScreen submitReview={onSubmitReview} />
          : <TimerScreen isTherapist={isTherapist} submitSessionEnded={onSubmitEndSession} />}
      </View>
    )}
  </Modal>
);

export default AppointmentModal;
