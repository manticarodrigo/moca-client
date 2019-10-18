import React, { useState } from 'react';
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
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);


  const handleSignUpPress = () => navigation.push('SelectionScreen');
  const toggleLoginModal = () => setIsLoginModalVisible(!isLoginModalVisible);


  const sumbitLogin = async (email: string, password: string) => {
    try {
      await dispatch(loginUser(email, password));

      setIsLoginSuccess(true);
      setIsLoginModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };


  const loginModal = (
    <LoginModal
      visible={isLoginModalVisible}
      onClose={toggleLoginModal}
      onLogin={sumbitLogin}
      onModalHide={() => {
        if (isLoginSuccess) {
          if (store.user.type === 'PT' && !store.user.preferredAilments.length) {
            navigation.navigate('QualificationsScreen');
          } else if (store.user.addresses.length === 0) {
            navigation.push('AddressScreen', { title: 'Address' });
          } else {
            navigation.navigate('DashboardScreen');
          }
          setIsLoginSuccess(false);
        }
      }}
    />
  );


  return (
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
          <Button onPress={handleSignUpPress}>
            Signup
          </Button>
          <View row justifyCenter spacing={{ mt: 4 }}>
            <Text variant="regular">Already have an account?</Text>
            <Text variant="link" spacing={{ ml: 1 }} onPress={toggleLoginModal}>Login</Text>
          </View>
        </View>
      </ContainedView>
      {loginModal}
    </View>
  );
};

OnboardingScreen.navigationOptions = {
  header: null,
};

export default OnboardingScreen;
