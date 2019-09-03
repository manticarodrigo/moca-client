import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import useNavigation from '@src/hooks/useNavigation';

import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import { BackButtonIcon } from '@src/components/icons';

import logoIcon from '@src/assets/pngs/logoIcon.png';

import { Views, Spacing, Colors } from '@src/styles';

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const handleButtonPress = () => navigation.navigate('UnvalidZipCodeScreen');
  const handleMedicareAgreement = () => navigation.navigate('UnvalidMediCareScreen');
  const handleMedicareDisagreement = () => navigation.navigate('');
  const handlePrivaryPress = () => navigation.navigate('');
  const handleTermsPress = () => navigation.navigate('TermsOfServiceScreen');

  return (
    <View safeArea justifyBetween expand width="100%" spacing={{ mt: 3 }}>
      <StatusBar barStyle="dark-content" />
      <View alignCenter>
        <Image file={logoIcon} width={51} height={59} />
        <Text variant="title" spacing={{ mt: 3 }}>Moca is available in your area </Text>
        <Text variant="regular" spacing={{ mt: 3 }}>
          We need some infromation to
        </Text>
        <Text variant="regular">
          get you started.
        </Text>
        <View variant="borderTop" width="100%" alignCenter spacing={{ mt: 3 }}>
          <View row spacing={{ m: 3 }}>
            <View spacing={{ mr: 3 }}>
              <Text variant="title" typography={{ size: 2 }}>Are you currently</Text>
              <Text variant="title" typography={{ size: 2 }}>covered by Medicare?</Text>
            </View>
            <View row alignCenter>
              <Button variant="secondary" onPress={handleMedicareAgreement}>
                Yes
              </Button>
              <View spacing={{ ml: 3 }}>
                <Button variant="secondary" onPress={handleMedicareDisagreement}>
                  No
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View width="100%" spacing={{ px: 3 }}>
        <Button onPress={handleButtonPress}>
          Continue
        </Button>
        <View alignCenter row spacing={{ mt: 3 }}>
          <Text variant="regular" typography={{ size: 1 }}>
            {'By continuing, I accept the Moca '}
          </Text>
          <Text variant="link" onPress={handleTermsPress} typography={{ size: 1 }}>
            terms of service
          </Text>
        </View>
        <View alignCenter row spacing={{ mt: 1, mb: 2 }}>
          <Text variant="regular" typography={{ size: 1 }}>
            {'and have read the '}
          </Text>
          <Text variant="link" onPress={handlePrivaryPress} typography={{ size: 1 }}>
            privacy policy
          </Text>
        </View>
      </View>
    </View>
  );
};

const BackButton = (
  <View shadow={{ color: 'secondary', blur: 2, alpha: 0.16 }}>
    <BackButtonIcon />
  </View>
);

const NavigationHeaderTittle = ({ title }) => (
  <Text spacing={{ ml: 3 }} typography={{ size: 3, weight: '700', color: 'primary' }}>
    {title}
  </Text>
);


RegistrationScreen.navigationOptions = () => ({
  headerTitle: <NavigationHeaderTittle title="Sign up" />,
  headerBackImage: BackButton,
  headerLeftContainerStyle: { ...Spacing.getStyles({ pt: 2, pl: 3 }) },
  headerStyle: {
    ...Views.borderBottom,
    backgroundColor: Colors.white,
    height: 80,
  },
});

// backpress navigation color! check.
// change text color on button press.
// status bar.

export default RegistrationScreen;
