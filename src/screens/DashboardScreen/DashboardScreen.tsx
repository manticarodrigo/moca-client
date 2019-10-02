import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

import useStore from '@src/hooks/useStore';

import { LogoIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';

import DashboardSearch from './DashboardSearch';
import DashboardAlert from './DashboardAlert';
import DashboardAppointments from './DashboardAppointments';
import DashboardLinks from './DashboardLinks';

const DashboardScreen = () => {
  const { store } = useStore();
  const [isTherapist] = useState(store.user.type === 'caregiver');
  const [isActivated] = useState(false);
  const [isFiltering, setFiltering] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setFiltering(true));
    Keyboard.addListener('keyboardDidHide', () => setFiltering(false));

    return Keyboard.removeAllListeners;
  }, []);

  return (
    <View safeArea flex={1} bgColor="primary">

      <View row justifyEnd absoluteFill spacing={{ mt: -6, mr: -5 }}>
        <LogoIcon size={2} />
      </View>

      {isActivated && isTherapist && (
        <View row justifyCenter alignCenter spacing={{ p: 4, pt: 3 }}>
          <Text variant="titleSmallWhite">Appointments</Text>
        </View>
      )}
      {!isTherapist && <DashboardSearch name={store.user.username} />}

      {!isFiltering && (
        <View scroll flex={1}>
          {!isActivated && isTherapist && <DashboardAlert />}
          {(!isTherapist || isActivated) && <DashboardAppointments isTherapist={isTherapist} />}
          <DashboardLinks isActivated={isActivated} isTherapist={isTherapist} />
        </View>
      )}
    </View>
  );
};

DashboardScreen.navigationOptions = {
  header: null,
};

export default DashboardScreen;
