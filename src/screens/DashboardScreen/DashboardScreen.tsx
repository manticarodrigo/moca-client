import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';

import { Appointment } from '@src/store/reducers/AppointmentReducer';
import { UserState } from '@src/store/reducers/UserReducer';

import useStore from '@src/hooks/useStore';

import { getUpcomingAppointments, getLastAppointment } from '@src/store/actions/AppointmentAction';

import { SearchIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import LogoBackground from '@src/components/LogoBackground';
import AwayCard from '@src/components/AwayCard';

import TimerModal from '@src/modals/TimerModal';
import CancellationModal from '@src/modals/CancellationModal';

import DashboardAlert from './DashboardAlert';
import DashboardAppointments from './DashboardAppointments';
import DashboardLinks from './DashboardLinks';

type Props = NavigationStackScreenProps & { isFocused: boolean }

// TODO: integrate with API
const isActivated = true;
const isAway = false;

const initialModalState = {
  timer: false,
  review: false,
  cancellation: false,
};

type ModalState = typeof initialModalState;

const DashboardScreen: NavigationStackScreenComponent = ({ navigation, isFocused }: Props) => {
  const { store, dispatch } = useStore();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment>();
  const [modalState, setModalState] = useState<Partial<ModalState>>(initialModalState);

  const isTherapist = store.user.type === 'PT';

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        await dispatch(getUpcomingAppointments());
        dispatch(getLastAppointment());
      } catch (e) {
        // console.log(e);
      }
    };

    if (isFocused) {
      fetchAppointments();
    }
  }, [isFocused]);

  const onPressSearch = () => navigation.push('SearchScreen');

  const onPressAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);

    return setModalState({ timer: true });
  };

  const onPressAppointmentAction = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setModalState({ cancellation: true });
  };

  const onMessageUser = (user: UserState) => {
    setModalState({});

    navigation.navigate('ConversationScreen', { user });
  };

  const onCloseModals = () => setModalState({});

  const onEndTimer = () => {
    // TODO: end time early API
    onCloseModals();
  };

  return (
    <>
      <TimerModal
        visible={modalState.timer}
        appointment={selectedAppointment}
        isTherapist={isTherapist}
        onClose={onCloseModals}
        onEnd={onEndTimer}
      />

      <CancellationModal
        visible={modalState.cancellation}
        onToggle={onCloseModals}
      />

      <View safeArea flex={1} bgColor="primary">
        <LogoBackground />

        {isActivated && isTherapist && (
          <View row justifyCenter alignCenter spacing={{ p: 4, pt: 3 }}>
            <Text variant="titleSmallWhite">Appointments</Text>
          </View>
        )}

        {!isTherapist && (
          <View row justifyBetween alignCenter spacing={{ p: 4, pt: 5 }}>
            <Text variant="titleWhite">{`Hi, ${store.user.firstName}`}</Text>
            <View variant="rounded" spacing={{ p: 2 }} bgColor="secondary" onPress={onPressSearch}>
              <View spacing={{ p: 1 }}>
                <SearchIcon tint="#fff" />
              </View>
            </View>
          </View>
        )}

        <View scroll flex={1}>
          {!isActivated && isTherapist && <DashboardAlert />}
          {!!(isTherapist && isAway) && (
            <View
              column
              spacing={{ px: 3, py: 4 }}
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
