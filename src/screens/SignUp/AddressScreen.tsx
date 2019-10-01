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
  const [formFields, setFormFields] = useState({
    street: '',
    apartmentNumber: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const isAdditionalAddress = navigation.getParam('isAdditionalAddress', false);
  const isExistingAddress = navigation.getParam('isExistingAddress', false);
  const isRegistering = !(isExistingAddress || isAdditionalAddress);

  const apartmentField = useRef(null);
  const cityField = useRef(null);
  const stateField = useRef(null);
  const zipCodeField = useRef(null);


  const [{ registrationState: { userInformation: { name, address } } }, dispatch] = useStore();
  const isAnyFieldEmpty = Object.values(formFields).includes('');
  const isButtonDisabled = isAnyFieldEmpty;

  let buttonText = 'Continue';
  if (isExistingAddress) {
    buttonText = 'Update';
  }
  if (isAdditionalAddress) {
    buttonText = 'ADD';
  }


  useEffect(() => {
    if (isRegistering) {
      const { zipCode } = address[0];
      setFormFields({
        ...formFields,
        zipCode,
      });
    }

    if (isExistingAddress) {
      const userAddress = navigation.getParam('userAddress', {});
      const { street, state, city, apartmentNumber, zipCode } = userAddress;

      setFormFields({
        ...formFields,
        street,
        state,
        city,
        apartmentNumber,
        zipCode,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleButtonPress = () => {
    if (isRegistering) {
      const newAddress = [];
      newAddress.push({ ...formFields });
      dispatch(updateUserInfomation({ address: newAddress }));
      navigation.navigate('AddressSettingScreen');
      // dashboard
    }

    const newAddress = address.map((x) => ({ ...x }));

    if (isExistingAddress) {
      const index = navigation.getParam('index');
      newAddress[index] = { ...formFields };
      dispatch(updateUserInfomation({ address: newAddress }));
      navigation.goBack();
      // api put request
      // store used as an example
    }

    if (isAdditionalAddress) {
      newAddress.push({ ...formFields });
      dispatch(updateUserInfomation({ address: newAddress }));
      navigation.goBack();
      // api post request
      // store used as an example
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
            {isRegistering
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
                onSubmitEditing={() => zipCodeField.current.focus()}
                onChangeText={(text) => handleFormFields('state', text)}
              />
              <FormField
                placeholder="ZIP Code"
                value={formFields.zipCode}
                editable={!isRegistering}
                ref={zipCodeField}
                selectTextOnFocus={false}
                onChangeText={(text) => handleFormFields('zipCode', text)}
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
