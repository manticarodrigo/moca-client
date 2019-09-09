import React, { useState } from 'react';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-navigation';

import useNavigation from '@src/hooks/useNavigation';
import useStore from '@src/hooks/useStore';

import { updateUserInfomation } from '@src/store/actions/RegistrationAction';

import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import BackButton from '@src/components/BackButton';
import HeaderTitle from '@src/components/HeaderTitle';
import FormField from '@src/components/FormField';

import logoIcon from '@src/assets/pngs/logoIcon.png';
import EmailIcon from '@src/assets/Icons/email.png';
import PasswordIcon from '@src/assets/Icons/eye.png';

import { Views, Spacing, Colors } from '@src/styles';

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [{ registrationState: { userInformation } }, dispatch] = useStore();
  const [formFields, setFormFields] = useState({
    surname: '',
    email: '',
    name: '',
    password: '',
    medicalId: '',
  });
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const isPatient = userInformation.type === 'Patient';


  const handleButtonPress = () => {
    // validation
    dispatch(updateUserInfomation({ ...formFields }));
    if (userInformation.type === 'Patient') {
      navigation.navigate('AddressScreen', {
        name: formFields.name,
      });
    } else {
      navigation.navigate('QualificationsScreen', {
        name: formFields.name,
      });
    }
  };

  const handleMedicareAgreement = () => {
    navigation.navigate('InvalidMediCareScreen');
  };

  const handleMedicareDisagreement = () => {
    if (isButtonPressed) setIsButtonPressed(false);
    else setIsButtonPressed(true);
  };

  const handlePrivaryPress = () => navigation.navigate('');

  const handleTermsPress = () => navigation.navigate('TermsOfServiceScreen', { transition: 'slideTop' });

  const handleFormFields = (name: string, text: string) => {
    setFormFields({ ...formFields, [name]: text });
  };

  const mediCare = (
    <View row spacing={{ px: 3, py: 4 }} justifyBetween width="100%" variant="borderTop">
      <View>
        <Text variant="title" typography={{ size: 2 }}>Are you currently</Text>
        <Text variant="title" typography={{ size: 2 }}>covered by Medicare?</Text>
      </View>
      <View row>
        <Button variant="tertiary" onPress={handleMedicareAgreement}>
          Yes
        </Button>
        <View spacing={{ ml: 3 }}>
          <Button variant={isButtonPressed ? 'buttonPressed' : 'tertiary'} onPress={handleMedicareDisagreement}>
            No
          </Button>
        </View>
      </View>
    </View>
  );

  const medicalId = (
    <FormField
      placeholder="Medical Id"
      value={formFields.medicalId}
      returnKeyType="next"
      keyboardType="number-pad"
      onChangeText={(text) => handleFormFields('medicalId', text)}
    />
  );


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
    >
      <View safeArea flex={1} spacing={{ mt: 4 }} justifyEnd>
        <StatusBar barStyle="dark-content" />
        <View alignCenter>
          <Image file={logoIcon} width={49} height={60} />
          <Text variant="title" spacing={{ mt: 3 }}>Moca is available in your area</Text>
          <Text variant="regular" spacing={{ mt: 2 }}>
            We need some infromation to
          </Text>
          <Text variant="regular" spacing={{ mt: 1, mb: 2 }}>
            get you started.
          </Text>
        </View>
        {isPatient && mediCare}
        <View spacing={{ mb: 3 }}>
          <FormField
            placeholder="Name"
            value={formFields.name}
            returnKeyType="next"
            onChangeText={(text) => handleFormFields('name', text)}
          />
          <FormField
            placeholder="Surname"
            value={formFields.surname}
            returnKeyType="next"
            onChangeText={(text) => handleFormFields('surname', text)}
          />
          {!isPatient && medicalId}
          <FormField
            placeholder="Email address"
            value={formFields.email}
            returnKeyType="next"
            keyboardType="email-address"
            onChangeText={(text) => handleFormFields('email', text)}
            icon={EmailIcon}
          />
          <FormField
            placeholder="password"
            value={formFields.password}
            secureTextEntry
            returnKeyType="done"
            onChangeText={(text) => handleFormFields('password', text)}
            icon={PasswordIcon}
          />
        </View>
        <View spacing={{ mx: 3 }}>
          <Button onPress={handleButtonPress}>
            Continue
          </Button>
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
              onPress={handleTermsPress}
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
              onPress={handlePrivaryPress}
              typography={{ size: 1, color: 'secondary' }}
              spacing={{ ml: 1 }}
            >
              privacy policy
            </Text>
          </View>
        </View>
        <View flex={1} />
      </View>
    </KeyboardAvoidingView>
  );
};

RegistrationScreen.navigationOptions = () => ({
  headerTitle: <HeaderTitle title="Sign up" />,
  headerBackImage: BackButton,
  headerLeftContainerStyle: { ...Spacing.getStyles({ pt: 2, pl: 3 }) },
  headerStyle: {
    ...Views.borderBottom,
    backgroundColor: Colors.white,
    height: 80,
  },
});

export default RegistrationScreen;
