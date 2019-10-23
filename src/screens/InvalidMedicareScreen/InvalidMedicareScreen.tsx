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

const InvalidMedicareScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { dispatch } = useStore();

  const {
    formFields,
    isAnyFieldEmpty,
    isFormValid,
    onChangeField,
  } = useFormFields<{ email: string }>({ email: '' });

  const isButtonDisabled = isAnyFieldEmpty || !isFormValid;

  const submitEmail = () => true; // TODO: send to MailChimp list

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
              Sorry !
            </Text>
            <Text variant="regular" spacing={{ mt: 3 }} typography={{ size: 1, align: 'center' }}>
              Due to regulations we are still working to offer
              services for Medicare patients. Please provide
              We are currently not available in your area, but
              our email and we will notify you when this
              update is complete. You will also receive a $25
              discount on your first therapy session when
              the update is complete
              we become available in your area
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

InvalidMedicareScreen.navigationOptions = ({ navigationOptions }) => ({
  title: 'Medicare',
  headerTitleStyle: {
    color: Colors.primary,
  },
  headerStyle: {
    ...navigationOptions.headerStyle as {},
    ...Views.borderBottom,
    backgroundColor: Colors.white,
  },
});

export default InvalidMedicareScreen;
