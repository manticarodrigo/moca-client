import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { NavigationStackScreenProps, NavigationStackScreenComponent } from 'react-navigation-stack';

import useStore from '@src/hooks/useStore';

import { UserState } from '@src/store/reducers/UserReducer';
import { Appointment } from '@src/store/reducers/AppointmentReducer';

import api from '@src/services/api';

import View from '@src/components/View';
import AppointmentCard from '@src/components/AppointmentCard';

import NotesModal from '@src/modals/NotesModal';

type Props = NavigationStackScreenProps & {
  isFocused?: boolean;
}

const HistoryScreen: NavigationStackScreenComponent = ({ navigation, isFocused }: Props) => {
  const { store } = useStore();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState();

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

  const onMessageUser = (user: UserState) => {
    navigation.navigate('ConversationScreen', { user });
  };

  const onOpenNotes = (index: number) => () => {
    if (appointments[index]) {
      setSelectedAppointment(appointments[index]);
    }
  };

  const onCloseNotes = () => setSelectedAppointment(undefined);

  return (
    <>
      <NotesModal
        appointment={selectedAppointment}
        visible={!!selectedAppointment}
        onSubmit={(values) => console.log(values)}
        onClose={onCloseNotes}
      />

      <View scroll height="100%" bgColor="lightGrey" spacing={{ py: 3, px: 2 }}>
        {appointments.map((appointment, index) => (
          <View key={appointment.id} spacing={{ p: 2 }}>
            <AppointmentCard
              past
              appointment={appointment}
              onPressBtn={onOpenNotes(index)}
              onMessageUser={onMessageUser}
            />
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
