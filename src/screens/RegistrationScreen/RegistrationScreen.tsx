import React, { useState, useEffect, useRef } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import useStore from '@src/hooks/useStore';
import { updateRegistration } from '@src/store/actions/RegistrationAction';
import { registerUser } from '@src/store/actions/UserAction';
import { validateEmailAddress } from '@src/utlities/validations';

import TermsOfServiceModal from '@src/modals/TermsOfServiceModal';

import { Colors, Views } from '@src/styles';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import FormField from '@src/components/FormField';
import ModalView from '@src/components/ModalView';

import SecondaryLogoIcon from '@src/components/icons/SecondaryLogo';
import EmailIcon from '@src/assets/Icons/email.png';
import PasswordIcon from '@src/assets/Icons/eye.png';

const RegistrationScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { store, dispatch } = useStore();

  const isPatient = store.registration.type === 'PA';

  const surnameField = useRef(null);
  const emailField = useRef(null);
  const passwordField = useRef(null);
  const medicalIdField = useRef(null);

  const [formFields, setFormFields] = useState<typeof store.registration>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    ...(!isPatient && { licenseNumber: '' }),
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isMediCarePressed, setIsMediCarePressed] = useState(false);


  const isAnyFieldEmpty = Object.values(formFields).includes('');
  const isButtonDisabled = isPatient
    ? (isAnyFieldEmpty || !isMediCarePressed || !isEmailValid)
    : isAnyFieldEmpty || !isEmailValid;

  useEffect(() => {
    if (store.registration && store.registration.email) {
      const { email, firstName, lastName, password } = store.registration;

      setFormFields({
        ...formFields,
        ...(!isPatient && { medicalId: store.registration.licenseNumber }),
        email,
        password,
        firstName,
        lastName,
      });

      setIsMediCarePressed(true);

      if (!validateEmailAddress(email)) {
        setIsEmailValid(false);
      }
    }
  }, []);


  const TermsOfServiceModalView = (
    <ModalView
      isVisible={isModalVisible}
      onBackdropPress={() => setIsModalVisible(false)}
      onSwipeComplete={() => setIsModalVisible(false)}
      handleArrowClick={() => setIsModalVisible(false)}
    >
      <TermsOfServiceModal />
    </ModalView>
  );

  const handleButtonPress = async () => {
    const { email, password, firstName, lastName } = formFields;

    dispatch(updateRegistration({ ...formFields }));

    if (email && validateEmailAddress(email)) {
      setIsEmailValid(true);

      const { type } = store.registration;

      try {
        await dispatch(registerUser({ type, email, password, firstName, lastName }));

        if (isPatient) {
          navigation.push('AddressScreen', { title: 'Primary Address' });
        } else {
          navigation.push('QualificationsScreen');
        }
      } catch (error) {
        console.log('ERROR', JSON.stringify(error));
      }
    } else {
      setIsEmailValid(false);
    }
  };

  const handleMedicareAgreement = () => navigation.push('InvalidMedicareScreen');

  const handleMedicareDisagreement = () => setIsMediCarePressed(!isMediCarePressed);

  const handlePrivacyPress = () => navigation.navigate('ProfileScreen');

  const handleTermsOfServicePress = () => setIsModalVisible(true);

  const handleFormFields = (name: keyof typeof store.registration, text: string) => {
    setFormFields({ ...formFields, [name as string]: text });
  };

  return (

    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={60}
    >
      <View scroll>
        <View safeArea spacing={{ mt: 4 }} alignCenter>
          <View alignCenter spacing={{ mx: 3 }}>
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
                  <Button variant="tertiary" onPress={handleMedicareAgreement}>
                    Yes
                  </Button>
                  <View spacing={{ ml: 3 }}>
                    <Button
                      variant={isMediCarePressed ? 'buttonPressed' : 'tertiary'}
                      onPress={handleMedicareDisagreement}
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
              onChangeText={(text) => handleFormFields('firstName', text)}
              onSubmitEditing={() => surnameField.current.focus()}
            />
            <FormField
              placeholder="Last Name"
              value={formFields.lastName}
              returnKeyType="next"
              onChangeText={(text) => handleFormFields('lastName', text)}
              ref={surnameField}
              onSubmitEditing={() => {
                if (isPatient) {
                  emailField.current.focus();
                } else {
                  medicalIdField.current.focus();
                }
              }}
            />
            {!isPatient && (
              <FormField
                placeholder="Medical ID"
                value={formFields.licenseNumber}
                returnKeyType="done"
                keyboardType="numeric"
                ref={medicalIdField}
                onSubmitEditing={() => emailField.current.focus()}
                onChangeText={(text) => handleFormFields('licenseNumber', text)}
              />
            )}
            <FormField
              placeholder="Email address"
              value={formFields.email}
              returnKeyType="next"
              keyboardType="email-address"
              onChangeText={(text) => {
                handleFormFields('email', text);
                setIsEmailValid(true);
              }}
              error={!isEmailValid}
              ref={emailField}
              onSubmitEditing={() => passwordField.current.focus()}
              icon={EmailIcon}
            />
            {!isEmailValid
            && (
              <Text variant="errorSmall" spacing={{ mt: 1, ml: 5 }}>
                Please enter a valid Email address
              </Text>
            )}
            <FormField
              placeholder="Password"
              value={formFields.password}
              secureTextEntry
              returnKeyType="done"
              ref={passwordField}
              onChangeText={(text) => handleFormFields('password', text)}
              icon={PasswordIcon}
            />
          </View>
          <View row spacing={{ mx: 3 }}>
            <View flex={1}>
              <Button
                variant={isButtonDisabled ? 'primaryDisabled' : 'primary'}
                onPress={handleButtonPress}
                disabled={isButtonDisabled}
              >
              Continue
              </Button>
            </View>
          </View>
          <View spacing={{ mx: 3 }} alignCenter>
            <View alignCenter row spacing={{ mt: 2 }}>
              <Text
                variant="regular"
                spacing={{ mt: 1 }}
                typography={{ size: 1 }}
              >
                {'By continuing, I accept the Moca'}
              </Text>
              <Text
                variant="link"
                onPress={handleTermsOfServicePress}
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
                onPress={handlePrivacyPress}
                typography={{ size: 1, color: 'secondary' }}
                spacing={{ ml: 1 }}
              >
              privacy policy
              </Text>
            </View>
          </View>
        </View>
        {TermsOfServiceModalView}
        <View flex={1} />
      </View>
    </KeyboardAvoidingView>

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
