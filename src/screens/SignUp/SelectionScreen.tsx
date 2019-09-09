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
import { updateUserInfomation } from '@src/store/actions/RegistrationAction';

const SelectionScreen = () => {
  type Colors = keyof typeof Colors;

  let buttonText = 'Select';
  let patientBgColor: Colors = 'white';
  let therapistBgColor: Colors = 'white';
  let patientImage = patient;
  let therapistImage = therapist;

  const therapistImageWidth = 56;
  const therapistImageHeight = 110;
  const patientImageWidth = 48;
  const patientImageHeight = 93;

  const [type, setType] = useState('');
  const [, dispatch] = useStore();
  const navigation = useNavigation();

  if (type === 'Patient') {
    buttonText = 'Continue as a Patient';
    patientBgColor = 'secondary';
    therapistBgColor = 'white';
    patientImage = patientSelected;
    therapistImage = therapist;
  } else if (type === 'Therapist') {
    buttonText = 'Continue as a Therapist';
    patientBgColor = 'white';
    therapistBgColor = 'secondary';
    patientImage = patient;
    therapistImage = therapistSelected;
  }

  const handleButtonPress = () => {
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
          variant={type === 'Patient' ? 'imageBorderLeftPressed' : 'imageBorderLeft'}
          alignCenter
          justifyBetween
          {...(type !== 'Patient' ? { onPress: () => setType('Patient') } : '')}
          bgColor={patientBgColor}
        >
          <Image file={patientImage} width={patientImageWidth} height={patientImageHeight} />
          <Text variant="title">Patient</Text>
        </View>
        <View
          variant={type === 'Therapist' ? 'imageBorderRightPressed' : 'imageBorderRight'}
          alignCenter
          justifyBetween
          {...(type !== 'Therapist' ? { onPress: () => setType('Therapist') } : '')}
          bgColor={therapistBgColor}
        >
          <Image file={therapistImage} width={therapistImageWidth} height={therapistImageHeight} />
          <Text variant="title">Therapist</Text>
        </View>
      </View>
      <View width="100%" flex={1} justifyEnd spacing={{ mb: 3 }}>
        <Button
          variant={type === '' ? 'primaryDisabled' : 'primary'}
          {...(type !== '' ? { onPress: handleButtonPress } : '')}
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
