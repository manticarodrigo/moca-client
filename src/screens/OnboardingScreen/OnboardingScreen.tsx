import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';

import { WINDOW_WIDTH } from '@src/utlities/constants';

import useStore from '@src/hooks/useStore';

import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';
import Slider from '@src/components/Slider';
import Button from '@src/components/Button';
import ContainedView from '@src/components/ContainedView';

import Logo from '@src/assets/pngs/logo.png';
import ShieldIcon from '@src/components/icons/ShieldIcon';
import DeviceMapIcon from '@src/components/icons/DeviceMapIcon';
import SettingsIcon from '@src/components/icons/SettingsIcon';

import LoginModal from '@src/modals/LoginModal';

const slides = [
  {
    icon: <ShieldIcon />,
    title: 'Reliable',
    text: 'Physical Therapy Delivered to You.',
  },
  {
    icon: <DeviceMapIcon />,
    title: 'Hassle - Free',
    text: 'Fixed costs, no hidden fees, no insurance needed.',
  },
  {
    icon: <SettingsIcon />,
    title: 'Personalized',
    text: 'Direct medical access at your most convenient location.',
  },
];

type Props = NavigationStackScreenProps & {
  isFocused: boolean;
}

const OnboardingScreen: NavigationStackScreenComponent = ({ navigation }: Props) => {
  const { store } = useStore();
  const [isReady, setIsReady] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  const onPressSignup = () => navigation.push('SelectionScreen');

  const onToggleLoginModal = () => setLoginModalVisible(!loginModalVisible);

  useEffect(() => {
    if (!store.user.token && store.user.storageReady) {
      setIsReady(true);
    }
  }, [store.user]);

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <LoginModal visible={loginModalVisible} onClose={onToggleLoginModal} />

      <View safeArea flex={1} alignCenter bgColor="white">
        <ContainedView>
          <View flex={1} row justifyCenter p={4}>
            <Image width={175} height={110} file={Logo} />
          </View>
          {isReady && (
            <>
              <View flex={3} p={4}>
                <Slider slides={slides.map(({ icon, title, text }) => (
                  <View
                    key={title}
                    justifyCenter
                    alignCenter
                    flex={1}
                    mt={-6}
                    p={5}
                  >
                    <View>
                      {icon}
                    </View>
                    <Text variant="title" pt={4} pb={2}>
                      {title}
                    </Text>
                    <Text variant="regular" align="center">
                      {text}
                    </Text>
                  </View>
                ))}
                />
              </View>
              <View flex={1} p={4}>
                <Button onPress={onPressSignup}>
                  Signup
                </Button>
                <View row justifyCenter mt={4}>
                  <Text variant="regular">Already have an account?</Text>
                  <Text ml={1} variant="link" onPress={onToggleLoginModal}>Login</Text>
                </View>
              </View>
            </>
          )}
        </ContainedView>
      </View>
    </>
  );
};

OnboardingScreen.navigationOptions = {
  header: null,
};

export default OnboardingScreen;
