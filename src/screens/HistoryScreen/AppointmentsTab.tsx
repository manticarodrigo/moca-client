import React, { useState } from 'react';

import { InfoIcon, ClockIcon, CheckedIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';
import Rating from '@src/components/Rating';
import Button from '@src/components/Button';
import AppointmentCard from '@src/components/AppointmentCard';

import AddNoteModal from './AddNoteModal';


const AppointmentsTab = ({ isTherapist, appointments }) => {
  const [modalVisibility, setModalVisibility] = useState(false);

  const handleModalVisibility = () => {
    setModalVisibility(!modalVisibility);
  };

  return (
    <>
      <AddNoteModal modalVisibility={modalVisibility} handleArrowClick={handleModalVisibility} />
      <View scroll height="100%" bgColor="lightGrey" spacing={{ pt: 3 }}>
        {appointments.map((appointment) => (
          <View key={appointment.id} spacing={{ p: 2 }}>
            <AppointmentCard
              past
              isTherapist={isTherapist}
              appointment={appointment}
              onPressBtn={handleModalVisibility}
            />
          </View>
        ))}
      </View>
    </>
  );
};

export default AppointmentsTab;
