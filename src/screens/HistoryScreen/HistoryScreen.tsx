import React, { useState, useEffect } from 'react';
import { SectionList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { NavigationStackScreenProps, NavigationStackScreenComponent } from 'react-navigation-stack';

import useStore from '@src/hooks/useStore';
import useDateSections from '@src/hooks/useDateSections';

import { getPastAppointments } from '@src/store/actions/AppointmentAction';

import { UserState } from '@src/store/reducers/UserReducer';

import View from '@src/components/View';
import Text from '@src/components/Text';
import AppointmentCard from '@src/components/AppointmentCard';

import AppointmentModal from '@src/modals/AppointmentModal';
import ReviewModal from '@src/modals/ReviewModal';
import { Appointment } from '@src/store/reducers/AppointmentReducer';

type Props = NavigationStackScreenProps & {
  isFocused?: boolean;
}

const HistorySectionList: SectionList<Appointment> = SectionList;

const HistoryScreen: NavigationStackScreenComponent = ({ navigation, isFocused }: Props) => {
  const { store, dispatch } = useStore();
  const [selectedAppointment, setSelectedAppointment] = useState();

  const isTherapist = store.user.type === 'PT';

  const sections = useDateSections(
    store.appointments.past,
    ({ endTime }) => endTime as unknown as string,
  );

  useEffect(() => {
    if (isFocused) {
      dispatch(getPastAppointments());
    }
  }, [isFocused]);

  const onMessageUser = (user: UserState) => {
    navigation.navigate('ConversationScreen', { user });
  };

  const onPressAppointmentBtn = (appointment: Appointment) => () => {
    setSelectedAppointment(appointment);
  };

  const onCloseModal = () => setSelectedAppointment(undefined);

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
          sections={sections}
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
