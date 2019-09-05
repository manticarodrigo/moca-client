import React, { useState } from 'react';
import { StatusBar } from 'react-native';

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

  const isPatient = userInformation.type === 'Patient';

  const handleButtonPress = () => {
    dispatch(updateUserInfomation({ ...formFields }));
    navigation.navigate('InvalidZipCodeScreen');
  };
  const handleMedicareAgreement = () => navigation.navigate('InvalidMediCareScreen');
  const handleMedicareDisagreement = () => navigation.navigate('');
  const handlePrivaryPress = () => navigation.navigate('');
  const handleTermsPress = () => navigation.navigate('TermsOfServiceScreen');
  const handleFormFields = (name: string, text: string) => {
    setFormFields({ ...formFields, [name]: text });
  };

  const mediCare = (
    <View row spacing={{ m: 3 }}>
      <View spacing={{ mr: 3 }}>
        <Text variant="title" typography={{ size: 2 }}>Are you currently</Text>
        <Text variant="title" typography={{ size: 2 }}>covered by Medicare?</Text>
      </View>
      <View row alignCenter>
        <Button variant="secondary" onPress={handleMedicareAgreement}>
          Yes
        </Button>
        <View spacing={{ ml: 3 }}>
          <Button variant="secondary" onPress={handleMedicareDisagreement}>
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
      onChangeText={(text) => handleFormFields('medicalId', text)}
    />
  );


  return (
    <View safeArea justifyBetween expand width="100%" spacing={{ mt: 3 }}>
      <StatusBar barStyle="dark-content" />
      <View alignCenter>
        <Image file={logoIcon} width={51} height={59} />
        <Text variant="title" spacing={{ mt: 3 }}>Moca is available in your area</Text>
        <Text variant="regular" spacing={{ mt: 1 }}>
          We need some infromation to
        </Text>
        <Text variant="regular">
          get you started.
        </Text>
        <View variant="borderTop" width="100%" spacing={{ mt: 3 }}>
          {isPatient && mediCare}
        </View>
      </View>
      <View alignCenter spacing={{ mb: 3 }}>
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
        />
        <FormField
          placeholder="password"
          value={formFields.password}
          secureTextEntry
          returnKeyType="done"
          onChangeText={(text) => handleFormFields('password', text)}
        />
      </View>
      <View spacing={{ mx: 3 }}>
        <Button onPress={handleButtonPress}>
          Continue
        </Button>
        <View alignCenter row spacing={{ mt: 1 }}>
          <Text variant="regular" typography={{ size: 2 }}>
            {'By continuing, I accept the Moca '}
          </Text>
          <Text variant="link" onPress={handleTermsPress} typography={{ size: 1 }}>
            terms of service
          </Text>
        </View>
        <View alignCenter row spacing={{ mt: 1, mb: 2 }}>
          <Text variant="regular" typography={{ size: 1 }}>
            {'and have read the '}
          </Text>
          <Text variant="link" onPress={handlePrivaryPress} typography={{ size: 1 }}>
            privacy policy
          </Text>
        </View>
      </View>
    </View>
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
