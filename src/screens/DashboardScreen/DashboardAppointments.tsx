import React, { useMemo } from 'react';

import { isBefore, isAfter } from 'date-fns';

import useStore from '@src/hooks/useStore';

import View from '@src/components/View';
import Text from '@src/components/Text';
import AppointmentCard from '@src/components/AppointmentCard';

const DashboardAppointments = ({ isTherapist, onPressAppointment }) => {
  const { store } = useStore();

  const { current, next } = useMemo(() => {
    if (!store.appointments.length) {
      return { current: undefined, next: undefined };
    }

    const sortedAppointments = store.appointments.sort(
      (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
    );

    const nowDate = new Date();

    return {
      current: sortedAppointments.find(
        ({ startTime, endTime }) => (
          isBefore(new Date(startTime), nowDate) && isAfter(new Date(endTime), nowDate)
        ),
      ),
      next: sortedAppointments.find(
        ({ startTime }) => isAfter(new Date(startTime), nowDate),
      ),
    };
  }, [store.appointments]);

  return (
    <View column spacing={{ px: 3, py: 4 }} bgColor={!isTherapist ? 'blackTranslucent' : null}>

      {!isTherapist && (
        <Text variant="titleSmallSecondaryLight" spacing={{ mb: 3 }}>Appointments</Text>
      )}

      {current && (
        <View column justifyCenter spacing={{ mb: 3 }}>
          <Text variant="boldWhite" spacing={{ mb: 2 }}>Current</Text>
          <AppointmentCard
            current
            appointment={current}
            isTherapist={isTherapist}
            onPress={onPressAppointment}
          />
        </View>
      )}

      {next && (
        <View column justifyCenter>
          <Text variant="boldWhite" spacing={{ mb: 2 }}>Next</Text>
          <AppointmentCard appointment={next} isTherapist={isTherapist} />
        </View>
      )}

      {(!current && !next) && <Text variant="boldWhite">No appointments found.</Text>}
    </View>
  );
};

export default DashboardAppointments;
