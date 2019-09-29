import React, { useState, useRef, useEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-navigation';

import BackButton from '@src/components/BackButton';
import View from '@src/components/View';
import Button from '@src/components/Button';
import FormField from '@src/components/FormField';
import Text from '@src/components/Text';
import HeaderTitle from '@src/components/HeaderTitle';

import useStore from '@src/hooks/useStore';
import useNavigation from '@src/hooks/useNavigation';

import { updateUserInfomation } from '@src/store/actions/RegistrationAction';

import { Views, Spacing, Colors } from '@src/styles';

import BinIconRed from '@src/components/icons/BinIconRed';


const AddressScreen = () => {
  const navigation = useNavigation();
  const [{ registrationState: { userInformation: { name } } }] = useStore();

  const [formFields, setFormFields] = useState({
    street: '',
    apartmentNumber: '',
    city: '',
    state: '',
  });

  const isAdditionalLocation = navigation.getParam('isAdditionalLocation', false);
  const isExistingAddress = navigation.getParam('isExistingAddress', false);

  const apartmentField = useRef(null);
  const cityField = useRef(null);
  const stateField = useRef(null);

  const [{ registrationState: { userInformation } }, dispatch] = useStore();
  const isAnyFieldEmpty = Object.values(formFields).includes('');
  const isButtonDisabled = isAnyFieldEmpty;

  let buttonText = 'Continue';
  if (isExistingAddress) {
    buttonText = 'Update';
  }
  if (isAdditionalLocation) {
    buttonText = 'ADD';
  }

  useEffect(() => {
    if (isExistingAddress) {
      const userAddress = navigation.getParam('userAddress', {});
      const { street, state, city, apartmentNumber } = userAddress;

      setFormFields({
        ...formFields,
        street,
        state,
        city,
        apartmentNumber,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleButtonPress = () => {
    const newAddress = userInformation.address.map((x) => ({ ...x }));
    newAddress.push({ ...formFields });
    dispatch(updateUserInfomation({ address: newAddress }));
    // this is moved to the else statment

    if (isExistingAddress) {
      // compare results with user store
      // api call with new fields
    }
    if (isAdditionalLocation) {
      navigation.navigate('AddAddressScreen');
      // api call
    } else {
      // navigation.navigate('DashboardScreen');
      // api call submitting user infromation
      navigation.navigate('AddAddressScreen');
    }
  };

  const handleFormFields = (fieldName: string, text: string) => {
    setFormFields({ ...formFields, [fieldName]: text });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={Header.HEIGHT + 60}
    >
      <View scroll>
        <View safeArea spacing={{ pt: 3 }} alignCenter>
          <View spacing={{ mx: 3 }} alignCenter>
            {!isAdditionalLocation
              && (
                <View alignCenter>
                  <View row>
                    <Text variant="title" spacing={{ mt: 3 }}>Thanks for signing up, </Text>
                    <Text variant="title" spacing={{ mt: 3 }}>{name}</Text>
                  </View>
                  <Text variant="regular" spacing={{ mt: 1 }}>
                    What is your preferred address for treatment?
                  </Text>
                </View>
              )}
            <View spacing={{ mb: 3, mt: 4 }} alignCenter>
              <FormField
                placeholder="Street"
                value={formFields.street}
                returnKeyType="next"
                onSubmitEditing={() => apartmentField.current.focus()}
                onChangeText={(text) => handleFormFields('street', text)}
              />
              <FormField
                placeholder="Apartment Number"
                value={formFields.apartmentNumber}
                returnKeyType="next"
                onSubmitEditing={() => cityField.current.focus()}
                ref={apartmentField}
                onChangeText={(text) => handleFormFields('apartmentNumber', text)}
              />
              <FormField
                placeholder="City"
                value={formFields.city}
                ref={cityField}
                returnKeyType="done"
                onSubmitEditing={() => stateField.current.focus()}
                onChangeText={(text) => handleFormFields('city', text)}
              />
              <FormField
                placeholder="State"
                value={formFields.state}
                ref={stateField}
                onChangeText={(text) => handleFormFields('state', text)}
              />
              <FormField
                placeholder="ZIP Code"
                value={userInformation.zipCode}
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
            <View row>
              <View flex={1}>
                <Button
                  variant={isButtonDisabled ? 'primaryDisabled' : 'primary'}
                  onPress={handleButtonPress}
                  disabled={isButtonDisabled}
                >
                  {buttonText}
                </Button>
              </View>
            </View>
            <View flex={1} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};


AddressScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: <HeaderTitle title={navigation.state.params.title} />,
  headerBackImage: BackButton,
  headerLeftContainerStyle: { ...Spacing.getStyles({ pt: 2, pl: 3 }) },
  headerStyle: {
    ...Views.borderBottom,
    backgroundColor: Colors.white,
    height: 80,
  },
  headerRightContainerStyle: { ...Spacing.getStyles({ pt: 2, pr: 3 }) },
  headerRight: navigation.state.params.isExistingAddress
  && !navigation.state.params.isOnlyAddress
    ? (
      <View
        justifyCenter
        alignCenter
        onPress={() => {
          navigation.state.params.handleDelete();
          navigation.goBack();
        }}
      >
        <BinIconRed />
      </View>
    ) : null,
});

export default AddressScreen;
