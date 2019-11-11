import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';

import { Appointment } from '@src/store/reducers/AppointmentReducer';
import { UserState } from '@src/store/reducers/UserReducer';

import useStore from '@src/hooks/useStore';

import {
  getUpcomingAppointments,
  getLastAppointment,
  updateAppointment,
} from '@src/store/actions/AppointmentAction';

import View from '@src/components/View';
import Text from '@src/components/Text';
import LogoBackground from '@src/components/LogoBackground';
import AwayCard from '@src/components/AwayCard';

import AppointmentModal from '@src/modals/AppointmentModal';
import CancellationModal from '@src/modals/CancellationModal';

import DashboardAlert from './DashboardAlert';
import DashboardAppointments from './DashboardAppointments';
import DashboardLinks from './DashboardLinks';

type Props = NavigationStackScreenProps & { isFocused: boolean }

// TODO: integrate with API
const isActivated = true;
const isAway = false;

type ModalState = {
  timer?: boolean;
  notes?: boolean;
  review?: boolean;
  cancellation?: boolean;
};

const DashboardScreen: NavigationStackScreenComponent = ({ navigation, isFocused }: Props) => {
  const { store, dispatch } = useStore();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment>();
  const [modalState, setModalState] = useState<ModalState>({});

  const isTherapist = store.user.type === 'PT';

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        dispatch(getUpcomingAppointments());
        dispatch(getLastAppointment());
      } catch (e) {
        // console.log(e);
      }
    };

    if (isFocused) {
      fetchAppointments();
    }
  }, [isFocused]);

  const onPressAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);

    return setModalState({ timer: true });
  };

  const onPressAppointmentAction = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setModalState({ cancellation: true });
  };

  const onCloseModals = () => setModalState({});

  const onMessageUser = (user: UserState) => {
    setModalState({});

    navigation.navigate('ConversationScreen', { user });
  };

  const onEndTimer = () => {
    // TODO: end time early API
    // check if notes are finished, if not, navigate to the tab
    onCloseModals();
  };

  const onSubmitNote = async (note: Appointment['note']) => {
    await dispatch(updateAppointment(selectedAppointment.id.toString(), { note }));

    onCloseModals();
  };

  return (
    <>
      <AppointmentModal
        visible={modalState.timer}
        appointment={selectedAppointment}
        isTherapist={isTherapist}
        onClose={onCloseModals}
        onEndTimer={onEndTimer}
        onSubmitNotes={onSubmitNote}
      />

      <CancellationModal
        visible={modalState.cancellation}
        onToggle={onCloseModals}
      />

      <View safeArea flex={1} bgColor="primary">
        <LogoBackground />

        {isActivated && isTherapist && (
          <View row justifyCenter alignCenter p={4} pt={3}>
            <Text variant="semiBoldLarge" color="white">Appointments</Text>
          </View>
        )}

        {!isTherapist && (
          <View row alignCenter p={4} pt={5}>
            <Text variant="title" color="white">{`Hi, ${store.user.firstName}`}</Text>
          </View>
        )}

        <View scroll flex={1}>
          {!isActivated && isTherapist && <DashboardAlert />}
          {!!(isTherapist && isAway) && (
            <View
              py={4}
              px={3}
              bgColor={!isTherapist ? 'blackTranslucent' : null}
            >
              <AwayCard dateStart={new Date()} dateEnd={new Date()} />
            </View>
          )}
          {(!isTherapist || isActivated) && (
            <DashboardAppointments
              appointments={store.appointments.upcoming}
              isTherapist={isTherapist}
              onPressAppointment={onPressAppointment}
              onPressAppointmentAction={onPressAppointmentAction}
              onMessageUser={onMessageUser}
            />
          )}
          <DashboardLinks isActivated={isActivated} />
        </View>
      </View>
    </>
  );
};

DashboardScreen.navigationOptions = {
  header: null,
};

export default withNavigationFocus(DashboardScreen);
