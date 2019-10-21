import React from 'react';

import View from '@src/components/View';
import Text from '@src/components/Text';
import AppointmentCard from '@src/components/AppointmentCard';

const DashboardAppointments = ({ appointments, isTherapist, onPressAppointment }) => (
  <View column spacing={{ px: 3, py: 4 }} bgColor={!isTherapist ? 'blackTranslucent' : null}>

    {!isTherapist && (
      <Text variant="titleSmallSecondaryLight" spacing={{ mb: 3 }}>Appointments</Text>
    )}


    {appointments.length ? (
      <>
        <View column justifyCenter spacing={{ mb: 3 }}>
          <Text variant="boldWhite" spacing={{ mb: 2 }}>Current</Text>
          <AppointmentCard current isTherapist={isTherapist} onPress={onPressAppointment} />
        </View>

        <View column justifyCenter>
          <Text variant="boldWhite" spacing={{ mb: 2 }}>Next</Text>
          <AppointmentCard isTherapist={isTherapist} />
        </View>
      </>
    ) : (
      <Text variant="boldWhite">No appointments found.</Text>
    )}

  </View>
);

export default DashboardAppointments;
