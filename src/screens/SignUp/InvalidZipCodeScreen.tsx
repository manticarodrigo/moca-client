import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';

import useStore from '@src/hooks/useStore';
import { resetUserInformation } from '@src/store/actions/RegistrationAction';


import View from '@src/components/View';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import FormField from '@src/components/FormField';

import BigEnvelopeRedIcon from '@src/components/icons/BigEnvelopeRedIcon';
import EmailIcon from '@src/assets/Icons/email.png';

import { AuthScreenProps } from '@src/NavigationProvider';
import { baseScreenOptions } from '@src/routes/config';

type Props = AuthScreenProps<'InvalidZipCodeScreen'>;

const InvalidZipCodeScreen = ({ navigation }: Props) => {
  navigation.setOptions({ title: 'Location' });

  const { dispatch } = useStore();
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const paddingOffset = 80;
  const isButtonDisabled = email === '' || !isEmailValid;


  const validateEmailAddress = () => {
    // eslint-disable-next-line no-useless-escape
    const regexpEmail = new RegExp('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
    return regexpEmail.test(email);
  };

  const submitEmail = () => false; // Api call

  const handleButtonPress = () => {
    if (validateEmailAddress()) {
      setIsEmailValid(true);
      submitEmail();
      dispatch(resetUserInformation());

      navigation.reset({ routes: [{ name: 'OnboardingScreen' }] });
    } else {
      setIsEmailValid(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={baseScreenOptions.headerStyle.height + paddingOffset}
    >
      <View safeArea alignCenter justifyEnd>
        <View spacing={{ mt: 4, mx: 3 }} alignCenter>
          <View alignCenter>
            <BigEnvelopeRedIcon />
            <Text variant="error" spacing={{ mt: 4 }}>
              SORRY !
            </Text>
            <Text variant="regular" spacing={{ mt: 3 }} typography={{ size: 1, align: 'center' }}>
              Thanks for your interest in Moca
              We are currently not available in your area, but
              we are working hard to change that. Please
              provide your email with us to receive updates
              and therapy tips! You will receive a $50
              discount on your first therapy session when
              we become available in your area.
            </Text>
          </View>
          <View alignCenter spacing={{ mt: 3 }}>
            <FormField
              error={!isEmailValid}
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
          <View row spacing={{ mt: 3 }}>
            <View flex={1}>
              <Button
                variant={isButtonDisabled ? 'primaryDisabled' : 'primary'}
                onPress={handleButtonPress}
                disabled={isButtonDisabled}
              >
                Let us know
              </Button>
            </View>
          </View>
        </View>
        <View flex={1} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default InvalidZipCodeScreen;
