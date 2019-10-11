import React from 'react';

import View from '@src/components/View';
import Text from '@src/components/Text';
import AppointmentCard from '@src/components/AppointmentCard';
import AwayCard from '@src/components/AwayCard';

const DashboardAppointments = ({ isTherapist, isAway = true }) => (
  <View column spacing={{ px: 3, py: 4 }} bgColor={!isTherapist ? 'blackTranslucent' : null}>

    {!isTherapist && (
      <Text variant="titleSmallSecondaryLight" spacing={{ mb: 3 }}>Appointments</Text>
    )}

    <View column justifyCenter spacing={{ mb: 3 }}>
      {isTherapist && isAway ? (
        <AwayCard dateStart={new Date()} dateEnd={new Date()} />
      ) : (
        <>
          <Text variant="boldWhite" spacing={{ mb: 2 }}>Current</Text>
          <AppointmentCard current isTherapist={isTherapist} />
        </>
      )}
    </View>

    <View column justifyCenter>
      <Text variant="boldWhite" spacing={{ mb: 2 }}>Next</Text>
      <AppointmentCard isTherapist={isTherapist} />
    </View>
  </View>
);

export default DashboardAppointments;
