import React, { useState, useRef, useEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';

import useStore from '@src/hooks/useStore';

import { Views, Spacing, Colors } from '@src/styles';

import View from '@src/components/View';
import Button from '@src/components/Button';
import FormField from '@src/components/FormField';
import Text from '@src/components/Text';
import BackButton from '@src/components/BackButton';
import HeaderTitle from '@src/components/HeaderTitle';

import BinIconRed from '@src/components/icons/BinIconRed';

import { validateZipCode } from '@src/utlities/validations';

import { updateRegistration } from '@src/store/actions/RegistrationAction';

const AddressScreen = ({ navigation }: NavigationStackScreenProps) => {
  const { store, dispatch } = useStore();

  const [formFields, setFormFields] = useState<typeof store.registration.address>({
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [isZipCodeValid, setIsZipCodeValid] = useState(true);


  const isAdditionalAddress = navigation.getParam('isAdditionalAddress', false);
  const isExistingAddress = navigation.getParam('isExistingAddress', false);
  const isRegistering = !(isExistingAddress || isAdditionalAddress);

  const apartmentField = useRef(null);
  const cityField = useRef(null);
  const stateField = useRef(null);
  const zipCodeField = useRef(null);


  const isAnyFieldEmpty = Object.values(formFields).includes('');
  const isButtonDisabled = isAnyFieldEmpty || !isZipCodeValid;

  let buttonText = 'Continue';

  if (isExistingAddress) {
    buttonText = 'Update';
  }
  if (isAdditionalAddress) {
    buttonText = 'Add';
  }

  useEffect(() => {
    if (isRegistering) {
      const { zipCode } = store.registration.address;

      setFormFields({ ...formFields, zipCode });
    }

    if (isExistingAddress) {
      const userAddress = navigation.getParam('userAddress', {});
      const { street, state, city, apartment, zipCode } = userAddress;

      setFormFields({
        ...formFields,
        street,
        apartment,
        city,
        state,
        zipCode,
      });
    }
  }, []);


  const handleButtonPress = () => {
    if (isRegistering) {
      dispatch(updateRegistration({ address: formFields }));
      navigation.navigate('DashboardScreen');
    }

    if (isExistingAddress) {
      if (validateZipCode(formFields.zipCode)) {
        dispatch(updateRegistration({ address: formFields }));
        navigation.goBack();
      } else {
        setIsZipCodeValid(false);
      }
    }

    if (isAdditionalAddress) {
      if (validateZipCode(formFields.zipCode)) {
        dispatch(updateRegistration({ address: formFields }));
        navigation.goBack();
      } else {
        setIsZipCodeValid(false);
      }
    }
  };

  const handleFormFields = (fieldName: keyof typeof store.registration.address, text: string) => {
    setFormFields({ ...formFields, [fieldName]: text });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={60}
    >
      <View scroll flex={1}>
        <View safeArea spacing={{ pt: 3 }} alignCenter>
          <View spacing={{ mx: 3 }} alignCenter>
            {isRegistering
              && (
                <View alignCenter>
                  <View row>
                    <Text variant="title" spacing={{ mt: 3 }}>Thanks for signing up, </Text>
                    <Text variant="title" spacing={{ mt: 3 }}>
                      {store.user.firstName}
                    </Text>
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
                value={formFields.apartment}
                returnKeyType="next"
                onSubmitEditing={() => cityField.current.focus()}
                ref={apartmentField}
                onChangeText={(text) => handleFormFields('apartment', text)}
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
                error={!isZipCodeValid}
                placeholder="Zip Code"
                value={formFields.zipCode}
                editable={!isRegistering}
                ref={zipCodeField}
                maxLength={5}
                selectTextOnFocus={false}
                onChangeText={(text) => {
                  handleFormFields('zipCode', text);
                  setIsZipCodeValid(true);
                }}
              />
              {!isZipCodeValid && (
                <Text spacing={{ mt: 1 }} variant="errorSmall">
                  Please enter a valid Zip code
                </Text>
              )}
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
