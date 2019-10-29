import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { NavigationStackScreenProps, NavigationStackScreenComponent } from 'react-navigation-stack';

import useStore from '@src/hooks/useStore';

import { Appointment } from '@src/store/reducers/AppointmentReducer';

import api from '@src/services/api';

import View from '@src/components/View';
import AppointmentCard from '@src/components/AppointmentCard';

import NotesModal from '@src/modals/NotesModal';

type Props = NavigationStackScreenProps & {
  isFocused?: boolean;
}

const HistoryScreen: NavigationStackScreenComponent = ({ isFocused }: Props) => {
  const { store } = useStore();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [notesModalVisible, setNotesModalVisible] = useState(false);

  useEffect(() => {
    const fetchPastAppointments = async () => {
      try {
        const query = { end: new Date().toISOString() };
        const options = { headers: { Authorization: `Token ${store.user.token}` }, query };

        const { data } = await api.appointment.appointmentList(options);

        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        setAppointments(data);
      } catch (e) {
        // console.log(e);
      }
    };

    if (isFocused) {
      fetchPastAppointments();
    }
  }, [isFocused]);

  const toggleNotes = () => setNotesModalVisible(!notesModalVisible);

  return (
    <>
      <NotesModal visible={notesModalVisible} onClose={toggleNotes} />

      <View scroll height="100%" bgColor="lightGrey" spacing={{ py: 3, px: 2 }}>
        {appointments.map((appointment) => (
          <View key={appointment.id} spacing={{ p: 2 }}>
            <AppointmentCard past appointment={appointment} onPressBtn={toggleNotes} />
          </View>
        ))}
      </View>
    </>
  );
};

HistoryScreen.navigationOptions = () => ({
  headerTitle: 'History',
});

export default withNavigationFocus(HistoryScreen);
