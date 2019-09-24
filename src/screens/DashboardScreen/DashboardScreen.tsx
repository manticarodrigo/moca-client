import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

import useStore from '@src/hooks/useStore';

import { LogoIcon } from '@src/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';

import { ScreenProps } from '@src/stacks/DashboardStack';

import DashboardSearch from './DashboardSearch';
import DashboardAlert from './DashboardAlert';
import DashboardAppointments from './DashboardAppointments';
import DashboardLinks from './DashboardLinks';

type Props = ScreenProps<'DashboardScreen'>;

const DashboardScreen = ({ navigation }: Props) => {
  navigation.setOptions({ header: null });

  const { store } = useStore();
  const [isTherapist] = useState(false);
  const [isActivated] = useState(false);
  const [isFiltering, setFiltering] = useState(false);

  const _keyboardDidShow = () => { setFiltering(true); };
  const _keyboardDidHide = () => { setFiltering(false); };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

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

export default DashboardScreen;
