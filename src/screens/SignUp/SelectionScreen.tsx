import React, { useState } from 'react';

import useNavigation from '@src/hooks/useNavigation';

import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';
import Button from '@src/components/Button';

import patient from '@src/assets/pngs/patient.png';
import therapist from '@src/assets/pngs/therapist.png';
import patientSelected from '@src/assets/pngs/patientSelect.png';
import therapistSelected from '@src/assets/pngs/therapistSelect.png';

import { Colors } from '@src/styles/index';

import useStore from '@src/hooks/useStore';
import { updateUserInfomation, resetUserInformation } from '@src/store/actions/RegistrationAction';

const SelectionScreen = () => {
  type Colors = keyof typeof Colors;
  const navigation = useNavigation();

  const [type, setType] = useState('');
  const [{ registrationState: { userInformation } }, dispatch] = useStore();

  const therapistImageWidth = 56;
  const therapistImageHeight = 110;
  const patientImageWidth = 48;
  const patientImageHeight = 93;

  const isPatient = type === 'Patient';
  const isTherapist = type === 'Therapist';
  const buttonDisabled = type === '';


  let buttonText = 'Select';

  if (isTherapist) {
    buttonText = 'Continue as a Therapist';
  }

  if (isPatient) {
    buttonText = 'Continue as a Patient';
  }

  const patientBgColor: Colors = isPatient ? 'secondary' : 'white';
  const therapistBgColor: Colors = isTherapist ? 'secondary' : 'white';
  const patientImage = isPatient ? patientSelected : patient;
  const therapistImage = isTherapist ? therapistSelected : therapist;


  const handleButtonPress = () => {
    if (Object.prototype.hasOwnProperty.call(userInformation, 'type')) {
      if (userInformation.type !== type) dispatch(resetUserInformation());
    }
    dispatch(updateUserInfomation({ type }));
    navigation.navigate('ZipCodeScreen', { transition: 'slideTop' });
  };

  return (
    <View safeArea alignCenter flex={1} spacing={{ mx: 3 }}>
      <View spacing={{ mt: 5 }} alignCenter>
        <Text variant="title">Please select your</Text>
        <View alignCenter row>
          <Text variant="title" typography={{ color: 'secondary' }}>MOCA</Text>
          <Text variant="title" spacing={{ ml: 1 }}>Profile</Text>
        </View>
      </View>
      <View row spacing={{ mt: 5 }}>
        <View
          variant={isPatient ? 'imageBorderLeftPressed' : 'imageBorderLeft'}
          alignCenter
          justifyBetween
          {...(!isPatient ? { onPress: () => setType('Patient') } : '')}
          bgColor={patientBgColor}
        >
          <Image file={patientImage} width={patientImageWidth} height={patientImageHeight} />
          <Text variant="title">Patient</Text>
        </View>
        <View
          variant={isTherapist ? 'imageBorderRightPressed' : 'imageBorderRight'}
          alignCenter
          justifyBetween
          {...(!isTherapist ? { onPress: () => setType('Therapist') } : '')}
          bgColor={therapistBgColor}
        >
          <Image file={therapistImage} width={therapistImageWidth} height={therapistImageHeight} />
          <Text variant="title">Therapist</Text>
        </View>
      </View>
      <View width="100%" flex={1} justifyEnd spacing={{ mb: 3 }}>
        <Button
          variant={buttonDisabled ? 'primaryDisabled' : 'primary'}
          onPress={handleButtonPress}
          disabled={buttonDisabled}
        >
          {buttonText}
        </Button>
      </View>
    </View>
  );
};

SelectionScreen.navigationOptions = {
  header: null,
};


export default SelectionScreen;
