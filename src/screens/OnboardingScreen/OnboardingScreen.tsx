import React from 'react';

import useNavigation from '@src/hooks/useNavigation';

import View from '@src/components/View';
import Slider from '@src/components/Slider';
import Button from '@src/components/Button';

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

  const handleButtonPress = () => navigation.navigate('Tab');

  return (
    <View safeArea alignment={['fill', 'column', 'centerXY']} background="grey">
      <Slider slides={slides} />
      <Button onPress={handleButtonPress}>
        Go to Tabs
      </Button>
    </View>
  );
};

OnboardingScreen.navigationOptions = {
  header: null,
};

export default OnboardingScreen;
