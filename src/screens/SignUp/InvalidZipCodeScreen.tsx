import React, { useState } from 'react';
import { StackActions, NavigationActions, Header } from 'react-navigation';
import { KeyboardAvoidingView } from 'react-native';

import useNavigation from '@src/hooks/useNavigation';
import useStore from '@src/hooks/useStore';
import { resetUserInformation } from '@src/store/actions/RegistrationAction';


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
  const [, dispatch] = useStore();
  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmailAddress = () => {
    // eslint-disable-next-line no-useless-escape
    const regexpEmail = new RegExp('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
    return regexpEmail.test(email);
  };
  const submitEmail = () => true; // Api call

  const handleButtonPress = () => {
    if (validateEmailAddress()) {
      setIsEmailValid(true);
      submitEmail();
      dispatch(resetUserInformation());
      navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'OnboardingScreen' })],
      }));
    } else setIsEmailValid(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={Header.HEIGHT + 80}
    >
      <View safeArea flex={1} spacing={{ mt: 4, mx: 3 }} alignCenter justifyEnd>
        <View alignCenter>
          <Image file={InvalidZipCodeImage} width={74} height={87} />
          <Text variant="error" spacing={{ mt: 4 }}>
            {"Sorry, MOCA hasn't made it"}
          </Text>
          <Text variant="error">
            to your area yet
          </Text>
          <Text variant="regular" spacing={{ mt: 2 }} typography={{ size: 1 }}>
            {'Thanks for your interest in Moca!\n'}
            {'We are currently not available in your area, but\n'}
            {'we are working hard to change that. Please\n'}
            {'provide your email with us to receive updates\n'}
            {'and therapy tips! You will receive a $50\n'}
            {'discount on your first therapy session when\n'}
            {'we become available in your area.\n'}
          </Text>

        </View>
        <View alignCenter width="100%" spacing={{ mt: 4 }}>
          <FormField
            placeholder="Email address"
            value={email}
            returnKeyType="done"
            keyboardType="email-address"
            icon={EmailIcon}
            onChangeText={(text) => setEmail(text)}
          />
          {!isEmailValid
            && (
              <Text variant="errorSmall" spacing={{ mt: 1 }}>
                Please enter a valid Email address
              </Text>
            )}
        </View>
        <View width="100%" spacing={{ mt: 4 }}>
          <Button
            variant={email === '' ? 'primaryDisabled' : 'primary'}
            {...(email !== '' ? { onPress: handleButtonPress } : '')}
          >
            Let us know
          </Button>
        </View>
        <View flex={1} />
      </View>
    </KeyboardAvoidingView>
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
