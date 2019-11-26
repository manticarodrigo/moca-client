import React, { useState, useEffect, useMemo } from 'react';
import { SectionList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { NavigationStackScreenProps, NavigationStackScreenComponent } from 'react-navigation-stack';


import { UserState } from '@src/store/reducers/UserReducer';
import { Appointment } from '@src/store/reducers/AppointmentReducer';
import { getFinishedAppointments, getPastAppointments } from '@src/store/actions/AppointmentAction';

import useStore from '@src/hooks/useStore';
import useDateSections from '@src/hooks/useDateSections';

import View from '@src/components/View';
import Text from '@src/components/Text';
import AppointmentCard from '@src/components/AppointmentCard';

import AppointmentModal from '@src/modals/AppointmentModal';
import ReviewModal from '@src/modals/ReviewModal';

type Props = NavigationStackScreenProps & {
  isFocused?: boolean;
}

const HistorySectionList: SectionList<Appointment> = SectionList;

const HistoryScreen: NavigationStackScreenComponent = ({ navigation, isFocused }: Props) => {
  const { store, dispatch } = useStore();
  const [selectedAppointment, setSelectedAppointment] = useState();

  const isTherapist = store.user.type === 'PT';
  const appointmentParam = navigation.getParam('appointment');

  const sections = useDateSections(store.appointments.past, ({ endTime }) => endTime, true);

  useEffect(() => {
    if (isFocused) {
      dispatch(getFinishedAppointments());
      dispatch(getPastAppointments());
    }
  }, [isFocused]);

  useEffect(() => {
    if (!appointmentParam) return;

    const finished = store.appointments.finished.find(({ id }) => appointmentParam.id === id);
    const past = store.appointments.past.find(({ id }) => appointmentParam.id === id);

    if (selectedAppointment || (!finished && !past)) return;
    // eslint-disable-next-line no-undef
    requestAnimationFrame(() => {
      setSelectedAppointment(finished || past);
    });
  }, [store.appointments.past, store.appointments.finished]);

  const onMessageUser = (user: UserState) => {
    navigation.navigate('ConversationScreen', { user });
  };

  const onPressAppointmentBtn = (appointment: Appointment) => () => {
    setSelectedAppointment(appointment);
  };

  const onCloseModal = () => setSelectedAppointment(undefined);

  const composedSections = useMemo(() => {
    const composed = [];
    if (store.appointments.finished.length) {
      composed.push({
        title: 'Recently Finished',
        data: store.appointments.finished,
      });
    }
    return composed.concat(sections);
  }, [store.appointments.finished, sections]);

  return (
    <>
      {isTherapist ? (
        <AppointmentModal
          past
          isTherapist
          appointment={selectedAppointment}
          visible={isTherapist && !!selectedAppointment}
          onClose={onCloseModal}
        />
      ) : (
        <ReviewModal
          appointment={selectedAppointment}
          visible={!isTherapist && !!selectedAppointment}
          onClose={onCloseModal}
        />
      )}

      <View safeArea flex={1} bgColor="lightGrey">
        <HistorySectionList
          sections={composedSections}
          renderItem={(({ item }) => (
            <AppointmentCard
              past
              appointment={item}
              onPressBtn={onPressAppointmentBtn(item)}
              onMessageUser={onMessageUser}
            />
          ))}
          renderSectionHeader={({ section }) => (
            <View ml={3} py={3}>
              <Text variant="regular">
                {section.title.charAt(0).toUpperCase() + section.title.slice(1)}
              </Text>
            </View>
          )}
          stickySectionHeadersEnabled={false}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </>
  );
};

HistoryScreen.navigationOptions = () => ({
  headerTitle: 'History',
});

export default withNavigationFocus(HistoryScreen);
