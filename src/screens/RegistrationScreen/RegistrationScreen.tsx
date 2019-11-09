import React, { useState } from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { User } from '@src/services/openapi/api';

import useStore from '@src/hooks/useStore';
import useFormFields from '@src/hooks/useFormFields';

import { updateRegistration } from '@src/store/actions/RegistrationAction';
import { registerUser } from '@src/store/actions/UserAction';

import InfoModal from '@src/modals/InfoModal';

import { ToS } from '@src/content';

import { Colors, Views } from '@src/styles';

import KeyboardAwareScrollView from '@src/components/KeyboardAwareScrollView';
import View from '@src/components/View';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import FormField from '@src/components/FormField';

import SecondaryLogoIcon from '@src/components/icons/SecondaryLogo';

const RegistrationScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { store, dispatch } = useStore();

  const {
    formFields,
    setFieldRef,
    isAnyFieldEmpty,
    isFormValid,
    onChangeField,
    onFocusNext,
  } = useFormFields<User>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const isPatient = store.registration.type === 'PA';

  const [modalVisible, setModalVisible] = useState<'ToS' | 'Privacy'>();
  const [isMedicarePressed, setIsMedicarePressed] = useState(false);

  const isButtonDisabled = isPatient
    ? (isAnyFieldEmpty || !isMedicarePressed || !isFormValid)
    : isAnyFieldEmpty || !isFormValid;

  const onPressSubmit = async () => {
    const { email, password, firstName, lastName } = formFields;

    dispatch(updateRegistration({ ...formFields }));

    if (isFormValid) {
      const { type } = store.registration;

      try {
        await dispatch(registerUser({ type, email, password, firstName, lastName }));

        if (isPatient) {
          navigation.push('AddressScreen', { title: 'Address' });
        } else {
          navigation.push('QualificationsScreen');
        }
      } catch (error) {
        // console.log(error);
      }
    }
  };

  const onMedicareAgreement = () => navigation.push('InvalidRegistrationScreen');

  const onMedicareDisagreement = () => setIsMedicarePressed(!isMedicarePressed);

  const onPressTermsOfService = () => setModalVisible('ToS');

  const onPressPrivacy = () => setModalVisible('Privacy');

  const onCloseModal = () => setModalVisible(undefined);

  return (
    <>

      <InfoModal
        visible={modalVisible === 'ToS'}
        title="Terms of Service"
        json={ToS}
        onClose={onCloseModal}
      />
      <InfoModal
        visible={modalVisible === 'Privacy'}
        title="Privacy Policy"
        json={ToS}
        onClose={onCloseModal}
      />

      <View safeArea>
        <KeyboardAwareScrollView>
          <View alignCenter py={5} px={3}>
            <SecondaryLogoIcon />
            <Text variant="title" mt={3}>Moca is available in your area</Text>
            <Text variant="regular" mt={2}>
              We need some information to
            </Text>
            <Text variant="regular" mt={1} mb={2}>
              get you started.
            </Text>
          </View>
          {isPatient && (
            <View width="100%" variant="borderTop">
              <View row py={4} px={3}>
                <View flex={1}>
                  <Text variant="semiBold">
                    Are you currently covered by Medicare?
                  </Text>
                </View>
                <View row flex={1} justifyEnd>
                  <Button mr={2} variant="tertiary" onPress={onMedicareAgreement}>
                    Yes
                  </Button>
                  <Button
                    variant={isMedicarePressed ? 'buttonPressed' : 'tertiary'}
                    onPress={onMedicareDisagreement}
                  >
                    No
                  </Button>
                </View>
              </View>
            </View>
          )}
          <View p={3}>
            <FormField
              placeholder="First Name"
              value={formFields.firstName}
              returnKeyType="next"
              onChangeText={onChangeField('firstName')}
              onSubmitEditing={onFocusNext('lastName')}
            />
            <FormField
              ref={setFieldRef('lastName')}
              placeholder="Last Name"
              value={formFields.lastName}
              returnKeyType="next"
              onChangeText={onChangeField('lastName')}
              onSubmitEditing={onFocusNext('email')}
            />
            <FormField
              ref={setFieldRef('email')}
              icon="email"
              placeholder="Email address"
              value={formFields.email}
              validation="email"
              returnKeyType="next"
              keyboardType="email-address"
              onChangeText={onChangeField('email')}
              onSubmitEditing={onFocusNext('password')}
            />
            <FormField
              ref={setFieldRef('password')}
              icon="password"
              placeholder="Password"
              value={formFields.password}
              validation="password"
              secureTextEntry
              returnKeyType="done"
              onChangeText={onChangeField('password')}
            />
          </View>
          <View row p={3}>
            <View flex={1}>
              <Button
                variant={isButtonDisabled ? 'primaryDisabled' : 'primary'}
                onPress={onPressSubmit}
                disabled={isButtonDisabled}
              >
              Continue
              </Button>
            </View>
          </View>
          <View alignCenter p={3}>
            <View row alignCenter mt={2}>
              <Text variant="regularSmall" mt={1}>
                By continuing, I accept the Moca
              </Text>
              <Text
                mt={1}
                ml={1}
                variant="link"
                size={1}
                color="secondary"
                onPress={onPressTermsOfService}
              >
                terms of service
              </Text>
            </View>
            <View row alignCenter mt={1}>
              <Text variant="regularSmall">
                and have read the
              </Text>
              <Text
                ml={1}
                variant="link"
                size={1}
                color="secondary"
                onPress={onPressPrivacy}
              >
                privacy policy.
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

RegistrationScreen.navigationOptions = ({ navigationOptions }) => ({
  title: 'Sign Up',
  headerTitleStyle: {
    ...navigationOptions.headerTitleStyle as {},
    color: Colors.primary,
  },
  headerStyle: {
    ...navigationOptions.headerStyle as {},
    ...Views.borderBottom,
    backgroundColor: Colors.white,
  },
});

export default RegistrationScreen;
