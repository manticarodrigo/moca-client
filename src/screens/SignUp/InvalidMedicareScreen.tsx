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

import InvalidMediCareImage from '@src/assets/pngs/invalidZipCodeImage.png';

const InvalidMediCareScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleButtonPress = () => {
    // api call
    navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'OnboardingScreen' })],
    }));
  };

  return (
    <View safeArea flex={1} width="100%" spacing={{ mt: 3 }}>
      <View alignCenter spacing={{ mx: 4 }}>
        <Image file={InvalidMediCareImage} width={74} height={87} />
        <Text variant="error" spacing={{ mt: 3 }}>
          Sorry !
        </Text>
        <Text variant="regular" spacing={{ mt: 2, p: 3 }}>
          Due to regulations we are still working to offer services for Medicare
          patients. Please provide your email and we will notify you when this
          update is complete. You will also receive a $25 discount on your first
          therapy session when the update is complete.
        </Text>
      </View>
      <View alignCenter spacing={{ mt: 4 }}>
        <View width="100%" spacing={{ px: 4, pb: 4 }}>
          <View alignCenter spacing={{ mb: 3 }}>
            <FormField
              placeholder="Email address"
              value={email}
              returnKeyType="done"
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
              icon={EmailIcon}
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

InvalidMediCareScreen.navigationOptions = () => ({
  headerTitle: <HeaderTitle title="Medicare" />,
  headerBackImage: BackButton,
  headerLeftContainerStyle: { ...Spacing.getStyles({ pt: 2, pl: 3 }) },
  headerStyle: {
    ...Views.borderBottom,
    backgroundColor: Colors.white,
    height: 80,
  },
});
export default InvalidMediCareScreen;
