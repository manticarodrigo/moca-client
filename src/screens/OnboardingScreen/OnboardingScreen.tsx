import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';

import useStore from '@src/hooks/useStore';
import { loginUser } from '@src/store/actions/UserAction';

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
    text: 'Certified Physical Therapists.',
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


const OnboardingScreen = ({ navigation }: NavigationStackScreenProps) => {
  const { store, dispatch } = useStore();
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

  const onPressSignup = () => navigation.push('SelectionScreen');

  const onToggleLoginModal = () => setIsLoginModalVisible(!isLoginModalVisible);

  const onSumbitLogin = async (email: string, password: string) => {
    try {
      await dispatch(loginUser(email, password));

      setIsLoginModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onAuthenticate = async () => {
    // for navigation transitions
    await setTimeout(() => null);

    if (!store.user.id || !store.user.token) {
      return;
    }

    if (store.user.type === 'PT' && !store.user.preferredAilments.length) {
      navigation.navigate('QualificationsScreen');
    } else if (store.user.addresses.length === 0) {
      navigation.navigate('AddressScreen', { title: 'Address' });
    } else {
      navigation.navigate('DashboardScreen');
    }
  };

  useEffect(() => {
    onAuthenticate();
  }, [store.user]);


  return (
    <>
      <LoginModal
        visible={isLoginModalVisible}
        onClose={onToggleLoginModal}
        onLogin={onSumbitLogin}
        onModalHide={onAuthenticate}
      />
      <View safeArea flex={1} alignCenter bgColor="white">
        <StatusBar barStyle="dark-content" />
        <ContainedView>
          <View flex={1} row justifyCenter width="100%" spacing={{ p: 4 }}>
            <Image width={175} height={110} file={Logo} />
          </View>
          <View flex={3} spacing={{ p: 4 }}>
            <Slider slides={slides.map(({ icon, title, text }) => (
              <View key={title} style={{ marginTop: -50 }} column flex={1} justifyCenter alignCenter spacing={{ p: 5 }}>
                <View>
                  {icon}
                </View>
                <Text variant="title" spacing={{ pt: 4, pb: 2 }}>
                  {title}
                </Text>
                <Text variant="regular" typography={{ align: 'center' }}>
                  {text}
                </Text>
              </View>
            ))}
            />
          </View>
          <View flex={1} spacing={{ p: 4 }}>
            <Button onPress={onPressSignup}>
              Signup
            </Button>
            <View row justifyCenter spacing={{ mt: 4 }}>
              <Text variant="regular">Already have an account?</Text>
              <Text variant="link" spacing={{ ml: 1 }} onPress={onToggleLoginModal}>Login</Text>
            </View>
          </View>
        </ContainedView>
      </View>
    </>
  );
};

OnboardingScreen.navigationOptions = {
  header: null,
};

export default OnboardingScreen;
