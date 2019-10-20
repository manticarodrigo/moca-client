/* eslint-disable react/no-array-index-key */
import React from 'react';

import ModalView from '@src/components/ModalView';
import View from '@src/components/View';
import AppointmentHeader from '@src/components/AppointmentHeader';

import ReviewScreen from '@src/screens/ReviewScreen/ReviewScreen';
import TimerScreen from '@src/screens/TimerScreen/TimerScreen';


const AppointmentModal = ({
  closeInputModal,
  appointment,
  sessionEnded,
  isTherapist,
  isVisible,
  submitSessionEnded,
  submitReview,
}) => (
  <ModalView
    isVisible={isVisible}
    height={100}
    onBackdropPress={() => {
      closeInputModal();
    }}
    onSwipeComplete={() => {
      closeInputModal();
    }}
    handleArrowClick={() => {
      closeInputModal();
    }}
  >
    <View>
      <AppointmentHeader
        appointmentPrice={appointment.appointmentPrice}
        name={appointment.name}
        appointmentDuration={appointment.appointmentDuration}
      />
      {(!isTherapist && sessionEnded)
        ? <ReviewScreen submitReview={submitReview} />
        : <TimerScreen isTherapist={isTherapist} submitSessionEnded={submitSessionEnded} /> }
    </View>
  </ModalView>
);

export default AppointmentModal;
