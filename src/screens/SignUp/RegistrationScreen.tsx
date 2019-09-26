import React, { useState, useEffect, useRef } from 'react';
import { KeyboardAvoidingView } from 'react-native';

import useStore from '@src/hooks/useStore';
import { updateUserInfomation } from '@src/store/actions/RegistrationAction';

import TermsOfServiceScreen from '@src/modals/TermsOfServiceScreen';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import FormField from '@src/components/FormField';
import ModalView from '@src/components/ModalView';

import SecondaryLogoIcon from '@src/icons/SecondaryLogo';
import EmailIcon from '@src/assets/Icons/email.png';
import PasswordIcon from '@src/assets/Icons/eye.png';

import { ScreenProps } from '@src/routes/AuthStack';

type Props = ScreenProps<'RegistrationScreen'>;

const RegistrationScreen = ({ navigation }: Props) => {
  navigation.setOptions({ title: 'Sign Up' });

  const { store, dispatch } = useStore();
  const isPatient = store.registrationState.userInformation.type === 'Patient';

  const surnameField = useRef(null);
  const emailField = useRef(null);
  const passwordField = useRef(null);
  const medicalIdField = useRef(null);

  const [formFields, setFormFields] = useState({
    surname: '',
    email: '',
    name: '',
    password: '',
    ...(!isPatient && { medicalId: '' }),
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isMediCarePressed, setIsMediCarePressed] = useState(false);


  const isAnyFieldEmpty = Object.values(formFields).includes('');
  const isButtonDisabled = isPatient
    ? (isAnyFieldEmpty || !isMediCarePressed || !isEmailValid)
    : isAnyFieldEmpty || !isEmailValid;

  const validateEmailAddress = (email: string) => {
    const regexpEmail = new RegExp('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$');
    return regexpEmail.test(email);
  };

  useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(store.registrationState.userInformation, 'email')) {
      const { email, surname, name, password } = store.registrationState.userInformation;

      setFormFields({
        ...formFields,
        ...(!isPatient && { medicalId: store.registrationState.userInformation.medicalId }),
        surname,
        email,
        name,
        password,
      });
      setIsMediCarePressed(true);

      if (!validateEmailAddress(email)) {
        setIsEmailValid(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const TermsOfServiceModal = (
    <ModalView
      isVisible={isModalVisible}
      onBackdropPress={() => setIsModalVisible(false)}
      onSwipeComplete={() => setIsModalVisible(false)}
      handleArrowClick={() => setIsModalVisible(false)}
    >
      <TermsOfServiceScreen />
    </ModalView>
  );

  const handleButtonPress = () => {
    dispatch(updateUserInfomation({ ...formFields }));

    if (validateEmailAddress(formFields.email)) {
      setIsEmailValid(true);
      if (isPatient) {
        navigation.navigate('AddressScreen', {
          name: formFields.name,
        });
      } else {
        navigation.navigate('QualificationsScreen', {
          name: formFields.name,
        });
      }
    } else {
      setIsEmailValid(false);
    }
  };

  const handleMedicareAgreement = () => {
    navigation.navigate('InvalidMedicareScreen');
  };

  const handleMedicareDisagreement = () => {
    if (isMediCarePressed) {
      setIsMediCarePressed(false);
    } else {
      setIsMediCarePressed(true);
    }
  };

  const handlePrivacyPress = () => navigation.navigate('ProfileScreen');

  const handleTermsOfServicePress = () => {
    setIsModalVisible(true);
  };

  const handleFormFields = (name: string, text: string) => {
    setFormFields({ ...formFields, [name]: text });
  };

  const mediCare = (
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
            <Button variant={isMediCarePressed ? 'buttonPressed' : 'tertiary'} onPress={handleMedicareDisagreement}>
              No
            </Button>
          </View>
        </View>
      </View>
    </View>
  );

  const medicalId = (
    <FormField
      placeholder="Medical Id"
      value={formFields.medicalId}
      returnKeyType="done"
      keyboardType="numeric"
      ref={medicalIdField}
      onSubmitEditing={() => emailField.current.focus()}
      onChangeText={(text) => handleFormFields('medicalId', text)}
    />
  );

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
          {isPatient && mediCare}
          <View spacing={{ mb: 3, mx: 3 }} alignCenter>
            <FormField
              placeholder="Name"
              value={formFields.name}
              returnKeyType="next"
              onChangeText={(text) => handleFormFields('name', text)}
              onSubmitEditing={() => surnameField.current.focus()}
            />
            <FormField
              placeholder="Surname"
              value={formFields.surname}
              returnKeyType="next"
              onChangeText={(text) => handleFormFields('surname', text)}
              ref={surnameField}
              onSubmitEditing={() => {
                if (isPatient) {
                  emailField.current.focus();
                } else {
                  medicalIdField.current.focus();
                }
              }}
            />
            {!isPatient && medicalId}
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
              placeholder="password"
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
        {TermsOfServiceModal}
        <View flex={1} />
      </View>
    </KeyboardAvoidingView>

  );
};

export default RegistrationScreen;
