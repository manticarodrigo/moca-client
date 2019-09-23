import React, { useState } from 'react';

import ZipeCodeScreen from '@src/modals/ZipCodeScreen';

import { useNavigation } from '@react-navigation/core';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import ModalView from '@src/components/ModalView';


import PatientIcon from '@src/icons/PatientIcon';
import TherapistIcon from '@src/icons/TherapistIcon';
import TherapistSelectIcon from '@src/icons/TherapistSelectIcon';
import PatientSelectIcon from '@src/icons/PatientSelectIcon';

import { Colors } from '@src/styles/index';

import useStore from '@src/hooks/useStore';
import { updateUserInfomation, resetUserInformation } from '@src/store/actions/RegistrationAction';

const SelectionScreen = () => {
  type ColorKey = keyof typeof Colors;

  const navigation = useNavigation();
  const [type, setType] = useState('');
  const [{ registrationState: { userInformation } }, dispatch] = useStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [screenName, setScreenName] = useState();
  const [shouldNavigate, setShouldNavigate] = useState(false);

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

  const patientBgColor: ColorKey = isPatient ? 'white' : 'semiGreyLighter';
  const therapistBgColor: ColorKey = isTherapist ? 'white' : 'semiGreyLighter';
  const patientTextColor: ColorKey = isPatient ? 'primary' : 'white';
  const therapistTextColor: ColorKey = isTherapist ? 'primary' : 'white';


  const handleButtonPress = () => {
    if (Object.prototype.hasOwnProperty.call(userInformation, 'type')) {
      if (userInformation.type !== type) dispatch(resetUserInformation());
    }
    dispatch(updateUserInfomation({ type }));
    setIsModalVisible(true);
  };

  const navigateToScreen = (name: string) => {
    setIsModalVisible(false);
    setScreenName(name);
    setShouldNavigate(true);
  };

  const ZipCodeModal = (
    <ModalView
      isVisible={isModalVisible}
      onBackdropPress={() => setIsModalVisible(false)}
      onSwipeComplete={() => setIsModalVisible(false)}
      handleArrowClick={() => setIsModalVisible(false)}
      onModalHide={() => {
        if (shouldNavigate) {
          navigation.navigate(screenName);
          setShouldNavigate(false);
        }
      }}
    >
      <ZipeCodeScreen navigateToScreen={navigateToScreen} />
    </ModalView>
  );

  return (
    <>
      <View safeArea alignCenter flex={1} spacing={{ px: 3 }} width="100%">
        <View spacing={{ mt: 5 }} alignCenter>
          <Text variant="title">Please select your</Text>
          <View alignCenter row>
            <Text variant="title" typography={{ color: 'secondary' }}>MOCA</Text>
            <Text variant="title" spacing={{ ml: 1 }}>Profile</Text>
          </View>
        </View>
        <View row spacing={{ mt: 5 }}>
          <View
            variant={isPatient ? 'patientViewPressed' : 'patientView'}
            alignCenter
            justifyBetween
            {...(!isPatient ? { onPress: () => setType('Patient') } : '')}
            bgColor={patientBgColor}
            spacing={{ mr: 1 }}
          >
            {isPatient ? <PatientSelectIcon /> : <PatientIcon />}
            <Text variant="title" typography={{ color: patientTextColor, weight: '900' }}>PATIENT</Text>
          </View>
          <View
            variant={isTherapist ? 'therapistViewtPressed' : 'therapistView'}
            alignCenter
            justifyBetween
            {...(!isTherapist ? { onPress: () => setType('Therapist') } : '')}
            bgColor={therapistBgColor}
          >
            {isTherapist ? <TherapistSelectIcon /> : <TherapistIcon />}
            <Text variant="title" typography={{ color: therapistTextColor, weight: '900' }}>THERAPIST</Text>
          </View>
        </View>
        <View flex={1} width="100%" justifyEnd spacing={{ mb: 3, px: 3 }}>
          <Button
            variant={buttonDisabled ? 'primaryDisabled' : 'primary'}
            onPress={handleButtonPress}
            disabled={buttonDisabled}
          >
            {buttonText}
          </Button>
        </View>
        {ZipCodeModal}
      </View>
    </>
  );
};

SelectionScreen.navigationOptions = {
  header: null,
};


export default SelectionScreen;
