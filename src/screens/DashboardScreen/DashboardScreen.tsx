import React, { useState } from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import useStore from '@src/hooks/useStore';

import View from '@src/components/View';
import Text from '@src/components/Text';

import {
  LogoIcon,
  SearchIcon,
} from '@src/components/icons';

import DashboardAlert from './DashboardAlert';
import DashboardAppointments from './DashboardAppointments';
import DashboardLinks from './DashboardLinks';


const DashboardScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { store } = useStore();
  const [isTherapist] = useState(store.user.type === 'PT');
  const [isActivated] = useState(true);

  const onPressSearch = () => navigation.push('SearchScreen');

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
      {!isTherapist
        && (
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
        {(!isTherapist || isActivated) && <DashboardAppointments isTherapist={isTherapist} />}
        <DashboardLinks isActivated={isActivated} isTherapist={isTherapist} />
      </View>
    </View>
  );
};

DashboardScreen.navigationOptions = {
  header: null,
};

export default DashboardScreen;
