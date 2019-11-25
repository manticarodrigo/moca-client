import React, { useEffect } from 'react';
import { SectionList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { NavigationStackScreenProps, NavigationStackScreenComponent } from 'react-navigation-stack';

import useStore from '@src/hooks/useStore';
import useDateSections from '@src/hooks/useDateSections';

import { getFutureAppointments } from '@src/store/actions/AppointmentAction';
import { Appointment } from '@src/store/reducers/AppointmentReducer';

import { UserState } from '@src/store/reducers/UserReducer';

import View from '@src/components/View';
import Text from '@src/components/Text';
import AppointmentCard from '@src/components/AppointmentCard';


type Props = NavigationStackScreenProps & {
  isFocused?: boolean;
}

const UpcomingSectionList: SectionList<Appointment> = SectionList;

const UpcomingScreen: NavigationStackScreenComponent = ({ navigation, isFocused }: Props) => {
  const { store, dispatch } = useStore();

  const sections = useDateSections(store.appointments.future, ({ endTime }) => endTime, true, true);

  useEffect(() => {
    if (isFocused) {
      dispatch(getFutureAppointments());
    }
  }, [isFocused]);

  const onMessageUser = (user: UserState) => {
    navigation.navigate('ConversationScreen', { user });
  };

  const onPressAppointmentBtn = (appointment: Appointment) => () => {
    // cancel appointment
  };

  return (
    <>
      <View safeArea flex={1} bgColor="lightGrey">
        <UpcomingSectionList
          sections={sections}
          renderItem={(({ item }) => (
            <AppointmentCard
              upcoming
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

UpcomingScreen.navigationOptions = () => ({
  headerTitle: 'Upcoming',
});

export default withNavigationFocus(UpcomingScreen);
