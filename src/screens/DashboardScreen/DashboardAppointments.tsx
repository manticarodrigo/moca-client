import React, { useMemo } from 'react';
import { isBefore, isAfter } from 'date-fns';

import { UserState } from '@src/store/reducers/UserReducer';
import { Appointment } from '@src/store/reducers/AppointmentReducer';

import View from '@src/components/View';
import Text from '@src/components/Text';
import AppointmentCard from '@src/components/AppointmentCard';

const nowDate = new Date();

type Props = {
  isTherapist: boolean;
  appointments: Appointment[];
  onPressAppointment: (appointment: Appointment) => void;
  onPressAppointmentAction: (appointment: Appointment) => void;
  onMessageUser: (user: UserState) => void;
}

const DashboardAppointments = ({
  isTherapist,
  appointments,
  onPressAppointment,
  onPressAppointmentAction,
  onMessageUser,
}: Props) => {
  const { current, next } = useMemo(() => {
    if (!appointments.length) {
      return { current: undefined, next: undefined };
    }

    return {
      current: appointments.find(
        ({ startTime, endTime }) => (
          isBefore(new Date(startTime), nowDate) && isAfter(new Date(endTime), nowDate)
        ),
      ),
      next: appointments.find(
        ({ startTime }) => isAfter(new Date(startTime), nowDate),
      ),
    };
  }, [appointments]);

  return (
    <View px={3} py={4} bgColor={!isTherapist ? 'blackTranslucent' : null}>

      {!isTherapist && (
        <Text mb={3} variant="semiBoldLarge" color="secondaryLight">Appointments</Text>
      )}

      {current && (
        <View justifyCenter mb={3}>
          <Text mb={2} variant="semiBoldLarge" color="white">Current</Text>
          <AppointmentCard
            current
            appointment={current}
            onPress={onPressAppointment}
            onPressBtn={onPressAppointment}
            onMessageUser={onMessageUser}
          />
        </View>
      )}

      {next && (
        <View column justifyCenter>
          <Text mb={2} variant="semiBoldLarge" color="white">Next</Text>
          <AppointmentCard
            upcoming
            appointment={next}
            onPressBtn={onPressAppointmentAction}
            onMessageUser={onMessageUser}
          />
        </View>
      )}

      {(!current && !next) && <Text variant="semiBoldLarge" color="white">No appointments found.</Text>}
    </View>
  );
};

export default DashboardAppointments;
