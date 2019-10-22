import React, { useState } from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { UserTypeEnum } from '@src/services/openapi';

import useStore from '@src/hooks/useStore';
import { updateRegistration } from '@src/store/actions/RegistrationAction';

import { Colors } from '@src/styles/index';

import AddressModal from '@src/modals/AddressModal';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import ContainedView from '@src/components/ContainedView';

import PatientIcon from '@src/components/icons/PatientIcon';
import TherapistIcon from '@src/components/icons/TherapistIcon';


type ColorKey = keyof typeof Colors;

const SelectionScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { store, dispatch } = useStore();
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);

  const isPatient = store.registration.type === 'PA';
  const isTherapist = store.registration.type === 'PT';
  const buttonDisabled = store.registration.type === null;

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

  const onPressType = (type: UserTypeEnum) => () => dispatch(updateRegistration({ type }));

  const onPressContinue = () => setIsAddressModalVisible(true);

  const onCloseAddressModal = () => setIsAddressModalVisible(false);

  const onSubmitAddressModal = (address) => {
    dispatch(updateRegistration({ address }));

    // TODO: check against moca's available zip codes
    const isAreaAvailable = () => true;

    if (isAreaAvailable()) {
      navigation.push('RegistrationScreen');
    } else {
      navigation.push('InvalidZipCodeScreen');
    }

    setIsAddressModalVisible(false);
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
                onPress={onPressType(UserTypeEnum.PA)}
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
                onPress={onPressType(UserTypeEnum.PT)}
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
                onPress={onPressContinue}
                disabled={buttonDisabled}
              >
                {buttonText}
              </Button>
            </View>
          </ContainedView>
        </View>
      </View>
      <AddressModal
        isVisible={isAddressModalVisible}
        onClose={onCloseAddressModal}
        onSubmit={onSubmitAddressModal}
      />
    </>

  );
};

SelectionScreen.navigationOptions = {
  header: null,
};

export default SelectionScreen;
