import React from 'react';
import { StatusBar } from 'react-native';

import useNavigation from '@src/hooks/useNavigation';

import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';
import Slider from '@src/components/Slider';
import Button from '@src/components/Button';

import Logo from '@src/assets/pngs/logo.png';
import ShieldIcon from '@src/components/icons/ShieldIcon';
import DeviceMapIcon from '@src/components/icons/DeviceMapIcon';
import SettingsIcon from '@src/components/icons/SettingsIcon';

const OnboardingScreen = () => {
  const navigation = useNavigation();

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

<<<<<<< HEAD
<<<<<<< Updated upstream
  const handleButtonPress = () => navigation.navigate('Tab');
=======
  const handleButtonPress = () => navigation.navigate('SelectionScreen');

>>>>>>> Stashed changes
=======
  const handleButtonPress = () => navigation.navigate('TabStack');
>>>>>>> master

  return (
    <View safeArea expand alignCenter>
      <StatusBar barStyle="dark-content" />
      <View spacing={{ pt: 5 }}>
        <Image width={175} height={110} file={Logo} />
      </View>
      <Slider slides={slides.map(({ icon, title, text }) => (
        <View key={title} column expand justifyCenter alignCenter spacing={{ px: 5 }}>
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
        <Button onPress={handleButtonPress}>
          Signup
        </Button>
        <View row justifyCenter spacing={{ mt: 4 }}>
          <Text variant="regular">Already have an account?</Text>
          <Text variant="link" spacing={{ ml: 1 }} onPress={handleButtonPress}>Login</Text>
        </View>
      </View>
    </View>
  );
};

OnboardingScreen.navigationOptions = {
  header: null,
};

export default OnboardingScreen;
