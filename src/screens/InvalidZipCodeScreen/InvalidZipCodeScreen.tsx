import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import useStore from '@src/hooks/useStore';
import useFormFields from '@src/hooks/useFormFields';

import { resetRegistration } from '@src/store/actions/RegistrationAction';

import { Colors, Views } from '@src/styles';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import FormField from '@src/components/FormField';

import { BigEnvelopeRedIcon } from '@src/components/icons';

const InvalidZipCodeScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { dispatch } = useStore();

  const {
    formFields,
    isAnyFieldEmpty,
    isFormValid,
    onChangeField,
  } = useFormFields<{ email: string }>({ email: '' });

  const isButtonDisabled = isAnyFieldEmpty || !isFormValid;


  const submitEmail = () => false; // TODO: send to MailChimp list

  const handleButtonPress = () => {
    if (isFormValid) {
      submitEmail();
      dispatch(resetRegistration());

      navigation.popToTop();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={90}
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
              icon="email"
              placeholder="Email address"
              value={formFields.email}
              validation="email"
              returnKeyType="done"
              keyboardType="email-address"
              onChangeText={onChangeField('email')}
            />
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

InvalidZipCodeScreen.navigationOptions = ({ navigationOptions }) => ({
  title: 'Location',
  headerTitleStyle: {
    color: Colors.primary,
  },
  headerStyle: {
    ...navigationOptions.headerStyle as {},
    ...Views.borderBottom,
    backgroundColor: Colors.white,
  },
});

export default InvalidZipCodeScreen;
