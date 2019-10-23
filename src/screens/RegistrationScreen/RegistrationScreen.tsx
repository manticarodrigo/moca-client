import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { User } from '@src/services/openapi/api';

import useStore from '@src/hooks/useStore';
import useFormFields from '@src/hooks/useFormFields';

import { updateRegistration } from '@src/store/actions/RegistrationAction';
import { registerUser } from '@src/store/actions/UserAction';

import InfoModal from '@src/modals/InfoModal';

import { ToS } from '@src/content';

import { Colors, Views } from '@src/styles';

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

  const onMedicareAgreement = () => navigation.push('InvalidMedicareScreen');

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

      <KeyboardAvoidingView behavior="position">
        <View scroll>
          <View safeArea spacing={{ mt: 4 }} alignCenter>
            <View alignCenter spacing={{ py: 4, px: 3 }}>
              <SecondaryLogoIcon />
              <Text variant="title" spacing={{ mt: 3 }}>Moca is available in your area</Text>
              <Text variant="regular" spacing={{ mt: 2 }}>
                We need some information to
              </Text>
              <Text variant="regular" spacing={{ mt: 1, mb: 2 }}>
                get you started.
              </Text>
            </View>
            {isPatient && (
              <View width="100%" variant="borderTop">
                <View row spacing={{ mx: 3, py: 4 }}>
                  <View flex={1}>
                    <Text variant="title" typography={{ size: 2 }}>
                      {'Are you currently\n'}
                      covered by Medicare?
                    </Text>
                  </View>
                  <View row flex={1} justifyEnd>
                    <Button variant="tertiary" onPress={onMedicareAgreement}>
                      Yes
                    </Button>
                    <View spacing={{ ml: 3 }}>
                      <Button
                        variant={isMedicarePressed ? 'buttonPressed' : 'tertiary'}
                        onPress={onMedicareDisagreement}
                      >
                        No
                      </Button>
                    </View>
                  </View>
                </View>
              </View>
            )}
            <View spacing={{ mb: 3, mx: 3 }} alignCenter>
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
            <View row spacing={{ mx: 3, pt: 3 }}>
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
            <View spacing={{ mx: 3, pb: 3 }} alignCenter>
              <View alignCenter row spacing={{ mt: 2 }}>
                <Text
                  variant="regular"
                  spacing={{ mt: 1 }}
                  typography={{ size: 1 }}
                >
                  By continuing, I accept the Moca
                </Text>
                <Text
                  variant="link"
                  onPress={onPressTermsOfService}
                  typography={{ size: 1, color: 'secondary' }}
                  spacing={{ ml: 1, mt: 1 }}
                >
                terms of service
                </Text>
              </View>
              <View alignCenter row spacing={{ mt: 1, mb: 2 }}>
                <Text variant="regular" typography={{ size: 1 }}>
                and have read the
                </Text>
                <Text
                  variant="link"
                  onPress={onPressPrivacy}
                  typography={{ size: 1, color: 'secondary' }}
                  spacing={{ ml: 1 }}
                >
                privacy policy.
                </Text>
              </View>
            </View>
          </View>
          <View flex={1} />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

RegistrationScreen.navigationOptions = ({ navigationOptions }) => ({
  title: 'Sign Up',
  headerTitleStyle: {
    color: Colors.primary,
  },
  headerStyle: {
    ...navigationOptions.headerStyle as {},
    ...Views.borderBottom,
    backgroundColor: Colors.white,
  },
});

export default RegistrationScreen;
