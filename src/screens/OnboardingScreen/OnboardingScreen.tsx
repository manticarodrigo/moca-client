import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';

import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';
import Slider from '@src/components/Slider';
import Button from '@src/components/Button';

import Logo from '@src/assets/pngs/logo.png';
import ShieldIcon from '@src/components/icons/ShieldIcon';
import DeviceMapIcon from '@src/components/icons/DeviceMapIcon';
import SettingsIcon from '@src/components/icons/SettingsIcon';

import LoginModal from '@src/modals/LoginModal';
import ForgotPasswordModal from '@src/modals/ForgotPasswordModal';

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
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isPasswordModal, setIsPasswordModal] = useState(false);
  const [resetPassword, setRestPassword] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);


  const handleSignUpPress = () => navigation.push('SelectionScreen');
  const handleLoginPress = () => setIsLoginModal(true);
  const closeLoginModal = () => setIsLoginModal(false);
  const closePasswordModal = () => setIsPasswordModal(false);


  const sumbitLogin = () => {
    // api call

    // set user
    // success
    setIsLoginSuccess(true);
    setIsLoginModal(false);
  };

  const submitForgotPassword = () => {
    // api call

    setIsPasswordModal(false);
  };


  const loginModal = (
    <LoginModal
      isModalVisible={isLoginModal}
      closeInputModal={closeLoginModal}
      sumbitLogin={() => sumbitLogin()}
      handleRecoverPasswrod={() => {
        setRestPassword(true);
        closeLoginModal();
      }}
      onModalHide={() => {
        if (resetPassword) {
          setIsPasswordModal(true);
          setRestPassword(false);
        }
        if (isLoginSuccess) {
          navigation.push('DashboardScreen');
          setIsLoginSuccess(false);
        }
      }}
    />
  );

  const passwordModal = (
    <ForgotPasswordModal
      isModalVisible={isPasswordModal}
      closeInputModal={closePasswordModal}
      submitForgotPassword={submitForgotPassword}
      onModalHide={() => setIsLoginModal(true)}
    />
  );

  return (
    <View safeArea flex={1} alignCenter bgColor="white">
      <StatusBar barStyle="dark-content" />
      <View spacing={{ pt: 5 }}>
        <Image width={175} height={110} file={Logo} />
      </View>
      <Slider slides={slides.map(({ icon, title, text }) => (
        <View key={title} column flex={1} justifyCenter alignCenter spacing={{ px: 5 }}>
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
      <View width="100%" spacing={{ px: 4, pb: 4 }}>
        <Button onPress={handleSignUpPress}>
          Signup
        </Button>
        <View row justifyCenter spacing={{ mt: 4 }}>
          <Text variant="regular">Already have an account?</Text>
          <Text variant="link" spacing={{ ml: 1 }} onPress={handleLoginPress}>Login</Text>
        </View>
      </View>
      {passwordModal}
      {loginModal}
    </View>
  );
};

OnboardingScreen.navigationOptions = {
  header: null,
};

export default OnboardingScreen;
