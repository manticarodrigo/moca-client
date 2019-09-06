import React, { useState } from 'react';
import { StatusBar } from 'react-native';

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

  const [type, setType] = useState('');
  const [buttonText, setButtonText] = useState('Select');
  const [patientBgColor, setPatientBgColor] = useState<Colors>('white');
  const [therapistBgColor, setTherapistBgColor] = useState<Colors>('white');
  const [patientImage, setPatientImage] = useState(patient);
  const [therapistImage, setTherapistImage] = useState(therapist);
  const [, dispatch] = useStore();
  const navigation = useNavigation();


  const handleButtonPress = () => {
    dispatch(updateUserInfomation({ type }));
    navigation.navigate('ZipCodeScreen');
  };

  const handlePatientPress = () => {
    setButtonText('Continue as a Patient');
    setPatientBgColor('secondary');
    setTherapistBgColor('white');
    setPatientImage(patientSelected);
    setTherapistImage(therapist);
    setType('Patient');
  };

  const handleTherapistPress = () => {
    setButtonText('Continue as a Therapist');
    setPatientBgColor('white');
    setTherapistBgColor('secondary');
    setPatientImage(patient);
    setTherapistImage(therapistSelected);
    setType('Therapist');
  };

  return (
    <View safeArea alignCenter justifyBetween flex={1}>
      <StatusBar barStyle="dark-content" />
      <View spacing={{ pt: 5 }} alignCenter>
        <Text variant="title">Please select your</Text>
        <Text variant="title">Moca Profile</Text>
      </View>
      <View row>
        <View
          variant="imageBorderLeft"
          alignCenter
          justifyBetween
          onPress={handlePatientPress}
          bgColor={patientBgColor}
        >
          <Image file={patientImage} width={48} height={93} />
          <Text variant="title">Patient</Text>
        </View>
        <View
          variant="imageBorderRight"
          alignCenter
          justifyBetween
          onPress={handleTherapistPress}
          bgColor={therapistBgColor}
        >
          <Image file={therapistImage} width={56} height={110} />
          <Text variant="title">Therapist</Text>
        </View>
      </View>
      <View width="100%" spacing={{ px: 4, pb: 4 }}>
        <Button onPress={handleButtonPress}>
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
