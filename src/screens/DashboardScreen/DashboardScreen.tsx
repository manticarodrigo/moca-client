import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';
import { subHours } from 'date-fns';

import api from '@src/services/api';

import { Appointment } from '@src/store/reducers/AppointmentReducer';

import useStore from '@src/hooks/useStore';

import { SearchIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import LogoBackground from '@src/components/LogoBackground';
import AwayCard from '@src/components/AwayCard';

import TimerModal from '@src/modals/TimerModal';
import ReviewModal from '@src/modals/ReviewModal';
import CancellationModal from '@src/modals/CancellationModal';

import DashboardAlert from './DashboardAlert';
import DashboardAppointments from './DashboardAppointments';
import DashboardLinks from './DashboardLinks';

type Props = NavigationStackScreenProps & { isFocused: boolean }

// TODO: integrate with API
const isActivated = true;
const isAway = false;

const initialModalState = {
  appointment: false,
  cancellation: false,
};

type ModalState = typeof initialModalState;

const DashboardScreen: NavigationStackScreenComponent = ({ navigation, isFocused }: Props) => {
  const { store } = useStore();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment>();
  const [modalState, setModalState] = useState<ModalState>(initialModalState);
  const [sessionEnded, setSessionEnded] = useState(false);

  const isTherapist = store.user.type === 'PT';

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const query = { start: subHours(new Date(), 1).toISOString(), limit: 3 };
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
      fetchAppointments();
    }
  }, [isFocused]);

  const onPressSearch = () => navigation.push('SearchScreen');

  const onPressAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setModalState((prev) => ({ ...prev, appointment: true }));
  };

  const onPressAppointmentAction = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setModalState((prev) => ({ ...prev, cancellation: true }));
  };

  const onCloseModal = (key: keyof ModalState) => () => setModalState(
    (prev) => ({ ...prev, [key]: false }),
  );

  const onEndTimer = () => {
    setSessionEnded(true);
  };

  const onSubmitReview = (review) => console.log(review);

  return (
    <>
      <TimerModal
        visible={!sessionEnded && modalState.appointment}
        appointment={selectedAppointment}
        isTherapist={isTherapist}
        onClose={onCloseModal('appointment')}
        onEnd={onEndTimer}
      />

      {!isTherapist && (
        <ReviewModal
          visible={sessionEnded && modalState.appointment}
          appointment={selectedAppointment}
          onClose={onCloseModal('appointment')}
          onSubmit={onSubmitReview}
        />
      )}

      <CancellationModal
        visible={modalState.cancellation}
        onToggle={onCloseModal('cancellation')}
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
              appointments={appointments}
              isTherapist={isTherapist}
              onPressAppointment={onPressAppointment}
              onPressAppointmentAction={onPressAppointmentAction}
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
