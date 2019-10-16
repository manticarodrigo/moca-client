import React, { useState } from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { UserTypeEnum } from '@src/services/openapi';

import useStore from '@src/hooks/useStore';
import { updateRegistration, resetRegistration } from '@src/store/actions/RegistrationAction';

import { Colors } from '@src/styles/index';

import ZipCodeModal from '@src/modals/ZipCodeModal';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import ContainedView from '@src/components/ContainedView';

import PatientIcon from '@src/components/icons/PatientIcon';
import TherapistIcon from '@src/components/icons/TherapistIcon';


type ColorKey = keyof typeof Colors;

const SelectionScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { store, dispatch } = useStore();
  const { registration } = store;
  const [type, setType] = useState<typeof registration.type>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const isPatient = type === 'PA';
  const isTherapist = type === 'PT';
  const buttonDisabled = type === null;

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
    if (registration && registration.type) {
      if (registration.type !== type) dispatch(resetRegistration());
    }
    dispatch(updateRegistration({ type }));
    setIsModalVisible(true);
  };

  return (
    <>
      <View safeArea alignCenter>
        <View spacing={{ mx: 3 }} alignCenter>
          <ContainedView>

            <View spacing={{ p: 4 }} alignCenter>
              <Text variant="title">Please select your</Text>
              <View alignCenter row>
                <Text variant="title" typography={{ color: 'secondary' }}>MOCA</Text>
                <Text variant="title" spacing={{ ml: 1 }}>Profile</Text>
              </View>
            </View>
            <View flex={1} row alignCenter width="100%" spacing={{ py: 4 }}>
              <View
                variant={isPatient ? 'patientViewPressed' : 'patientView'}
                alignCenter
                flex={1}
                justifyBetween
                {...(!isPatient ? { onPress: () => setType(UserTypeEnum.PA) } : '')}
                bgColor={patientBgColor}
                spacing={{ mr: 1 }}
              >
                <PatientIcon focused={isPatient} />
                <Text
                  variant="title"
                  typography={{ color: patientTextColor, weight: '900' }}
                >
                  PATIENT
                </Text>
              </View>
              <View
                variant={isTherapist ? 'therapistViewPressed' : 'therapistView'}
                alignCenter
                flex={1}
                justifyBetween
                {...(!isTherapist ? { onPress: () => setType(UserTypeEnum.PT) } : '')}
                bgColor={therapistBgColor}
              >
                <TherapistIcon focused={isTherapist} />
                <Text
                  variant="title"
                  typography={{ color: therapistTextColor, weight: '900' }}
                >
                  THERAPIST
                </Text>
              </View>
            </View>
            <View row spacing={{ p: 4 }}>
              <Button
                width="100%"
                variant={buttonDisabled ? 'primaryDisabled' : 'primary'}
                onPress={handleButtonPress}
                disabled={buttonDisabled}
              >
                {buttonText}
              </Button>
            </View>
          </ContainedView>
        </View>
      </View>
      <ZipCodeModal
        isVisible={isModalVisible}
        navigation={navigation}
        onClose={() => setIsModalVisible(false)}
      />
    </>

  );
};

SelectionScreen.navigationOptions = {
  header: null,
};

export default SelectionScreen;
