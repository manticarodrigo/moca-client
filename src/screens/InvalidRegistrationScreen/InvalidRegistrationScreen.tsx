import React from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { InvalidLocationNotice, MedicareNotice } from '@src/content';

import useStore from '@src/hooks/useStore';
import useFormFields from '@src/hooks/useFormFields';

import { resetRegistration } from '@src/store/actions/RegistrationAction';

import { Colors, Views } from '@src/styles';

import KeyboardAwareScrollView from '@src/components/KeyboardAwareScrollView';
import View from '@src/components/View';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import FormField from '@src/components/FormField';

import { BigEnvelopeRedIcon } from '@src/components/icons';

const InvalidRegistrationScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { dispatch } = useStore();

  const { address } = navigation.state.params || {};

  const {
    fieldProps,
    isAnyFieldEmpty,
    isFormValid,
  } = useFormFields<{ email: string }>(
    { email: '' },
    { email: { required: true, validation: 'email' } },
  );

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
    <KeyboardAwareScrollView>
      <View safeArea>
        <View alignCenter py={4} px={3}>
          <View alignCenter>
            <BigEnvelopeRedIcon />
            <Text variant="title" color="error" py={4}>
              SORRY!
            </Text>
            <Text variant="regularSmall" align="center">
              {address ? InvalidLocationNotice.content : MedicareNotice.content}
            </Text>
          </View>
          <View alignCenter py={3}>
            <FormField
              {...fieldProps.email}
              icon="email"
              placeholder="Email address"
              returnKeyType="done"
              keyboardType="email-address"
            />
          </View>
          <View row py={3}>
            <View flex={1}>
              <Button
                variant={isButtonDisabled ? 'primaryDisabled' : 'primary'}
                onPress={handleButtonPress}
                disabled={isButtonDisabled}
              >
                Let Me Know
              </Button>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

InvalidRegistrationScreen.navigationOptions = ({ navigation, navigationOptions }) => {
  const { address } = navigation.state.params || {};

  return {
    title: (address && `${address.city}, ${address.state}`) || 'Medicare Notice',
    headerTitleStyle: {
      ...navigationOptions.headerTitleStyle as {},
      color: Colors.primary,
    },
    headerStyle: {
      ...navigationOptions.headerStyle as {},
      ...Views.borderBottom,
      backgroundColor: Colors.white,
    },
  };
};

export default InvalidRegistrationScreen;
