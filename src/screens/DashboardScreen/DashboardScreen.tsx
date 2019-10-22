import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';

import useStore from '@src/hooks/useStore';
import { getAppointments } from '@src/store/actions/AppointmentAction';

import { SearchIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import LogoBackground from '@src/components/LogoBackground';
import AwayCard from '@src/components/AwayCard';

import AppointmentModal from '@src/modals/AppointmentModal';

import DashboardAlert from './DashboardAlert';
import DashboardAppointments from './DashboardAppointments';
import DashboardLinks from './DashboardLinks';

type Props = NavigationStackScreenProps & { isFocused: boolean }

const DashboardScreen: NavigationStackScreenComponent = ({ navigation, isFocused }: Props) => {
  const { store, dispatch } = useStore();
  const [isActivated] = useState(true);
  const [isAway] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState();

  const isTherapist = store.user.type === 'PT';

  useEffect(() => {
    if (store.user.id) {
      dispatch(getAppointments());
    }
  }, [store.user, isFocused, dispatch]);

  const onPressSearch = () => navigation.push('SearchScreen');

  const onPressAppointment = () => {
    if (store.appointments[0]) {
      setSelectedAppointment(store.appointments[0]);
    }
  };

  const onSubmitEndSession = () => {
    if (isTherapist) {
      setSelectedAppointment(undefined);
      // api calls
    }
    setSessionEnded(true);
  };

  const onSubmitReview = () => {
    // api patient submit review
    setSelectedAppointment(undefined);
  };

  return (
    <>
      <AppointmentModal
        appointment={selectedAppointment}
        visible={!!selectedAppointment}
        isTherapist={isTherapist}
        sessionEnded={sessionEnded}
        onSubmitEndSession={onSubmitEndSession}
        onSubmitReview={onSubmitReview}
        onClose={() => setSelectedAppointment(undefined)}
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
          {isTherapist && isAway && (
            <View column spacing={{ px: 3, py: 4 }} bgColor={!isTherapist ? 'blackTranslucent' : null}>
              <AwayCard dateStart={new Date()} dateEnd={new Date()} />
            </View>
          )}
          {(!isTherapist || isActivated) && (
            <DashboardAppointments
              isTherapist={isTherapist}
              onPressAppointment={onPressAppointment}
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
