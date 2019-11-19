import React, { useState, useMemo, useEffect } from 'react';
import { InteractionManager } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';
import { isBefore, isAfter, subMinutes } from 'date-fns';

import { AppointmentStatusEnum } from '@src/services/openapi';
import { Appointment } from '@src/store/reducers/AppointmentReducer';
import { UserState } from '@src/store/reducers/UserReducer';

import useStore from '@src/hooks/useStore';

import { getUpcomingAppointments, getLastAppointment } from '@src/store/actions/AppointmentAction';

import View from '@src/components/View';
import Text from '@src/components/Text';
import LogoBackground from '@src/components/LogoBackground';
import AwayCard from '@src/components/AwayCard';

import AppointmentModal from '@src/modals/AppointmentModal';
import ReviewModal from '@src/modals/ReviewModal';
import CancellationModal from '@src/modals/CancellationModal';

import DashboardAlert from './DashboardAlert';
import DashboardAppointments from './DashboardAppointments';
import DashboardLinks from './DashboardLinks';

type Props = NavigationStackScreenProps & { isFocused: boolean }

// TODO: integrate with API
const isAway = false;

type ModalState = {
  appointment?: boolean;
  review?: boolean;
  cancellation?: boolean;
};

const DashboardScreen: NavigationStackScreenComponent = ({ navigation, isFocused }: Props) => {
  const { store, dispatch } = useStore();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment>();
  const [modalState, setModalState] = useState<ModalState>({});

  const isTherapist = store.user.type === 'PT';
  const isActivated = !isTherapist || store.user.isVerified;

  const { current, next } = useMemo(() => {
    const appointments = store.appointments.upcoming;

    if (!appointments.length) {
      return { current: undefined, next: undefined };
    }

    const nowDate = new Date();

    const startOffset = 15;

    return {
      current: appointments.find(
        ({ startTime, endTime }) => (
          isBefore(subMinutes(new Date(startTime), startOffset), nowDate)
          && isAfter(new Date(endTime), nowDate)
        ),
      ),
      next: appointments.find(
        ({ startTime }) => isAfter(subMinutes(new Date(startTime), startOffset), nowDate),
      ),
    };
  }, [isFocused, store.appointments.upcoming]);

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

  useEffect(() => {
    if (!current || !isFocused) return;

    const inProgress = current.status === AppointmentStatusEnum.InProgress;
    const completed = current.status === AppointmentStatusEnum.Completed;

    const handleAppointmentActions = async () => {
      if (inProgress) {
        setSelectedAppointment(current);

        if (!modalState.appointment) {
          setModalState({ appointment: true });
        }
      }

      if (completed && !isTherapist) {
        setSelectedAppointment(current);

        if (modalState.appointment && !modalState.review) {
          setModalState({});
          InteractionManager.runAfterInteractions(() => {
            setTimeout(() => {
              setModalState({ review: true });
            }, 1000);
          });
        }

        if (!modalState.appointment && !modalState.review && !current.review) {
          setModalState({ review: true });
        }
      }
    };

    handleAppointmentActions();
  }, [current]);

  const onPressAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);

    let state: ModalState = { appointment: true };
    if (!isTherapist && appointment.status === AppointmentStatusEnum.Completed) {
      state = { review: true };
    }
    return setModalState(state);
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

  return (
    <>
      <AppointmentModal
        visible={modalState.appointment}
        appointment={selectedAppointment}
        isTherapist={isTherapist}
        onClose={onCloseModals}
      />
      {!isTherapist && (
        <ReviewModal
          visible={modalState.review}
          appointment={selectedAppointment}
          onClose={onCloseModals}
        />
      )}

      <CancellationModal
        visible={modalState.cancellation}
        appointmentId={selectedAppointment && selectedAppointment.id}
        onToggle={onCloseModals}
        onSubmit={onCloseModals}
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
              current={current}
              next={next}
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
