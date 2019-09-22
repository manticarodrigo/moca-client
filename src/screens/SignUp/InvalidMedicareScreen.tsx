import React, { useState } from 'react';
import { StackActions, NavigationActions, Header } from 'react-navigation';
import { KeyboardAvoidingView } from 'react-native';


import useNavigation from '@src/hooks/useNavigation';
import useStore from '@src/hooks/useStore';
import { resetUserInformation } from '@src/store/actions/RegistrationAction';


import View from '@src/components/View';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import HeaderTitle from '@src/components/HeaderTitle';
import BackButton from '@src/components/BackButton';
import FormField from '@src/components/FormField';

import EmailIcon from '@src/assets/Icons/email.png';
import BigEnvelopeRedIcon from '@src/icons/BigEnvelopeRedIcon';


import { Views, Spacing, Colors } from '@src/styles';

// can't export actual image right now

const InvalidMediCareScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [, dispatch] = useStore();
  const [isEmailValid, setIsEmailValid] = useState(true);

  const paddingOffset = 80;

  const isButtonDisabled = email === '' || !isEmailValid;

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
    } else {
      setIsEmailValid(false);
    }
  };


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={Header.HEIGHT + paddingOffset}
    >
      <View safeArea flex={1} spacing={{ mt: 4, mx: 3 }} alignCenter justifyEnd>
        <View alignCenter>
          <BigEnvelopeRedIcon />
          <Text variant="error" spacing={{ mt: 4 }}>
            Sorry !
          </Text>
          <Text variant="regular" spacing={{ mt: 3 }} typography={{ size: 1, align: 'center' }}>
            {'Due to regulations we are still working to offer\n'}
            {'services for Medicare patients. Please provide\n'}
            {'We are currently not available in your area, but\n'}
            {'our email and we will notify you when this\n'}
            {'update is complete. You will also receive a $25\n'}
            {'discount on your first therapy session when\n'}
            {'the update is complete\n'}
            {'we become available in your area\n'}
          </Text>
        </View>
        <View alignCenter width="100%" spacing={{ mt: 3 }}>
          <FormField
            placeholder="Email address"
            value={email}
            returnKeyType="done"
            keyboardType="email-address"
            icon={EmailIcon}
            onChangeText={(text) => {
              setEmail(text);
              setIsEmailValid(true);
            }}
          />
          {!isEmailValid
            && (
              <Text variant="errorSmall" spacing={{ mt: 1 }}>
                Please enter a valid Email address
              </Text>
            )}
        </View>
        <View width="100%" spacing={{ mt: 3 }}>
          <Button
            variant={isButtonDisabled ? 'primaryDisabled' : 'primary'}
            onPress={handleButtonPress}
            disabled={isButtonDisabled}
          >
            Let us know
          </Button>
        </View>
        <View flex={1} />
      </View>
    </KeyboardAvoidingView>
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
