import React from 'react';
import { Image } from 'react-native';
import useNavigation from '@src/hooks/useNavigation';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Slider from '@src/components/Slider';
import Button from '@src/components/Button';

import Logo from '@src/assets/pngs/logo.png';
import ShieldIcon from '@src/components/icons/ShieldIcon';
import DeviceMapIcon from '@src/components/icons/DeviceMapIcon';
import SettingsIcon from '@src/components/icons/SettingsIcon';

type Slide = {
  logo: JSX.Element;
  icon: JSX.Element;
  title: string;
  text: string;
}

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const slideArr = [
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

  const slideViews = slideArr.map(({ icon, title, text }) => (
    <View key={title} column expand center spacing={{ px: 5 }}>
      <View>
        {icon}
      </View>
      <Text spacing={{ pt: 4, pb: 2 }} typography={{ size: 4, weight: '700', color: 'primary' }}>
        {title}
      </Text>
      <Text typography={{ color: 'semiGrey', size: 2, weight: '500', align: 'center' }}>
        {text}
      </Text>
    </View>
  ));

  return (
    <View safeArea column expand center>
      <View spacing={{ mt: 6 }}>
        <Image style={{ width: 175, height: 110 }} source={Logo} />
      </View>
      <Slider slides={slideViews} />
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
