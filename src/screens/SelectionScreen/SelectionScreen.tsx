import React, { useState } from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { UserTypeEnum } from '@src/services/openapi';

import useStore from '@src/hooks/useStore';
import { AddAddressForm } from '@src/store/actions/UserAction';
import { updateRegistration } from '@src/store/actions/RegistrationAction';

import { Colors } from '@src/styles';

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

  const onSubmitAddressModal = (address: AddAddressForm) => {
    dispatch(updateRegistration({ address }));

    const isAreaAvailable = () => {
      const normalized = address.state.toLowerCase();
      if (normalized === 'ut' || normalized === 'utah') {
        return true;
      }

      return false;
    };

    if (isAreaAvailable()) {
      navigation.push('RegistrationScreen');
    } else {
      navigation.push('InvalidRegistrationScreen', { address });
    }

    setIsAddressModalVisible(false);
  };

  return (
    <>
      <View safeArea alignCenter>
        <View alignCenter mx={3}>
          <ContainedView>

            <View alignCenter p={4}>
              <Text variant="title">Please select your</Text>
              <View alignCenter row>
                <Text variant="title" color="secondary">MOCA</Text>
                <Text ml={1} variant="title">Profile</Text>
              </View>
            </View>
            <View row alignCenter flex={1} py={4} width="100%">
              <View
                justifyBetween
                alignCenter
                flex={1}
                mr={1}
                variant={isPatient ? 'patientViewPressed' : 'patientView'}
                bgColor={patientBgColor}
                onPress={onPressType(UserTypeEnum.PA)}
              >
                <PatientIcon focused={isPatient} />
                <Text
                  variant="bold"
                  size={4}
                  color={patientTextColor}
                >
                  PATIENT
                </Text>
              </View>
              <View
                justifyBetween
                alignCenter
                flex={1}
                variant={isTherapist ? 'therapistViewPressed' : 'therapistView'}
                bgColor={therapistBgColor}
                onPress={onPressType(UserTypeEnum.PT)}
              >
                <TherapistIcon focused={isTherapist} />
                <Text
                  variant="bold"
                  size={4}
                  color={therapistTextColor}
                >
                  THERAPIST
                </Text>
              </View>
            </View>
            <View row py={4}>
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

SelectionScreen.navigationOptions = ({ navigationOptions }) => ({
  title: null,
  headerTitleStyle: {
    ...navigationOptions.headerTitleStyle as {},
    color: Colors.primary,
  },
  headerStyle: {
    ...navigationOptions.headerStyle as {},
    backgroundColor: Colors.white,
  },
});

export default SelectionScreen;
