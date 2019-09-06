import React, { useState } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';

import useNavigation from '@src/hooks/useNavigation';

import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import HeaderTitle from '@src/components/HeaderTitle';
import BackButton from '@src/components/BackButton';
import FormField from '@src/components/FormField';

import EmailIcon from '@src/assets/Icons/email.png';

import { Views, Spacing, Colors } from '@src/styles';


import InvalidZipCodeImage from '@src/assets/pngs/invalidZipCodeImage.png';

const InvalidZipCodeScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleButtonPress = () => {
    navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'OnboardingScreen' })],
    }));
  };

  return (
    <View safeArea expand width="100%" spacing={{ mt: 3 }}>
      <View alignCenter spacing={{ mx: 4 }}>
        <Image file={InvalidZipCodeImage} width={74} height={87} />
        <Text variant="error" spacing={{ mt: 3 }}>
          {"Sorry, MOCA hasn't made it"}
        </Text>
        <Text variant="error">
          to your area yet
        </Text>
        <Text variant="regular" spacing={{ mt: 2 }}>
          Thanks for your interest in Moca!
        </Text>
        <Text variant="regular" spacing={{ mt: 1, p: 3 }}>
          We are currently not available in your area, but we are working hard to change
          that Please provide your email with us to receive updates and therapy
          tips! You will receive a $50 discount on your first therapy session when
          we become available in your area.
        </Text>
      </View>
      <View alignCenter spacing={{ mt: 2 }}>
        <View width="100%" spacing={{ px: 4, pb: 4 }}>
          <View alignCenter spacing={{ mb: 3 }}>
            <FormField
              placeholder="Email address"
              value={email}
              returnKeyType="done"
              keyboardType="email-address"
              icon={EmailIcon}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <Button onPress={handleButtonPress}>
            Let us know
          </Button>
        </View>
      </View>
    </View>
  );
};

InvalidZipCodeScreen.navigationOptions = () => ({
  headerTitle: <HeaderTitle title="Location" />,
  headerBackImage: BackButton,
  headerLeftContainerStyle: { ...Spacing.getStyles({ pt: 2, pl: 3 }) },
  headerStyle: {
    ...Views.borderBottom,
    backgroundColor: Colors.white,
    height: 80,
  },
});
export default InvalidZipCodeScreen;
