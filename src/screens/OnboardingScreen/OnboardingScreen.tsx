import React from 'react';

import useNavigation from '@src/hooks/useNavigation';

import Flex from '@src/components/Flex';
import Slider from '@src/components/Slider';
import Button from '@src/components/Button';

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const slides = [
    {
      title: 'Reliable',
      text: 'Certified Physical Therapists.',
    },
    {
      title: 'Hassle - Free',
      text: 'Fixed costs, no hidden fees, no insurance needed.',
    },
    {
      title: 'Personalized',
      text: 'Direct medical access at your most convenient location.',
    },
  ];

  const handleButtonPress = () => navigation.navigate('Tab');

  return (
    <Flex safeArea direction="column" alignment="flexCenterXY" background="grey">
      <Slider slides={slides} />
      <Button onPress={handleButtonPress}>
        Go to Tabs
      </Button>
    </Flex>
  );
};


OnboardingScreen.navigationOptions = {
  header: null,
};

export default OnboardingScreen;
