import React, { useState, useRef, useEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import useStore from '@src/hooks/useStore';
import { addUserAddress } from '@src/store/actions/UserAction';
import { AddressCreate } from '@src/services/openapi';

import { Views, Spacing, Colors } from '@src/styles';

import View from '@src/components/View';
import Button from '@src/components/Button';
import Text from '@src/components/Text';
import FormField from '@src/components/FormField';
import { Checkbox } from '@src/components/Checkbox';
import BackButton from '@src/components/BackButton';
import HeaderTitle from '@src/components/HeaderTitle';

import BinIconRed from '@src/components/icons/BinIconRed';

import { validateZipCode } from '@src/utlities/validations';


const AddressScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { store, dispatch } = useStore();

  const [formFields, setFormFields] = useState<AddressCreate>({
    name: '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    primary: true,
    location: 'test',
  });
  const [isZipCodeValid, setIsZipCodeValid] = useState(true);

  const isAdditionalAddress = navigation.getParam('isAdditionalAddress', false);
  const isExistingAddress = navigation.getParam('isExistingAddress', false);
  const isRegistering = !(isExistingAddress || isAdditionalAddress);

  const streetField = useRef(null);
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

  const updateFormField = (key: keyof typeof formFields) => (value: string | boolean) => {
    setFormFields({ ...formFields, [key]: value });

    if (key === 'zipCode') {
      setIsZipCodeValid(true);
    }
  };

  useEffect(() => {
    if (isRegistering) {
      const { zipCode = '' } = store.user.addresses[0] || {};

      updateFormField('zipCode')(zipCode);
    }

    if (isExistingAddress) {
      const userAddress = navigation.getParam('userAddress', {});
      const { street, state, city, apartment, zipCode } = userAddress;

      setFormFields({ ...formFields, street, apartment, city, state, zipCode });
    }
  }, []);

  const checkFormValid = () => validateZipCode(formFields.zipCode);

  const handleButtonPress = () => {
    if (isAnyFieldEmpty) {
      return;
    }

    if (isRegistering) {
      dispatch(addUserAddress(formFields));
      navigation.navigate('DashboardScreen');
    }

    if (isExistingAddress) {
      if (checkFormValid()) {
        // dispatch(updateRegistration({ address: formFields }));
        navigation.goBack();
      }
    }

    if (isAdditionalAddress) {
      if (checkFormValid()) {
        dispatch(addUserAddress(formFields));
        navigation.goBack();
      }
    }
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
            {isRegistering && (
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
                placeholder="Name"
                value={formFields.name}
                returnKeyType="next"
                onSubmitEditing={() => streetField.current.focus()}
                onChangeText={updateFormField('name')}
              />
              <FormField
                ref={streetField}
                placeholder="Street"
                value={formFields.street}
                returnKeyType="next"
                onSubmitEditing={() => apartmentField.current.focus()}
                onChangeText={updateFormField('street')}
              />
              <FormField
                ref={apartmentField}
                placeholder="Apartment Number"
                value={formFields.apartment}
                returnKeyType="next"
                onSubmitEditing={() => cityField.current.focus()}
                onChangeText={updateFormField('apartment')}
              />
              <FormField
                ref={cityField}
                placeholder="City"
                value={formFields.city}
                returnKeyType="done"
                onSubmitEditing={() => stateField.current.focus()}
                onChangeText={updateFormField('city')}
              />
              <FormField
                ref={stateField}
                placeholder="State"
                value={formFields.state}
                onSubmitEditing={() => zipCodeField.current.focus()}
                onChangeText={updateFormField('state')}
              />
              <FormField
                ref={zipCodeField}
                error={!isZipCodeValid && 'Please enter a valid Zip Code'}
                placeholder="Zip Code"
                value={formFields.zipCode}
                maxLength={5}
                selectTextOnFocus={false}
                onChangeText={updateFormField('zipCode')}
              />
              <View
                row
                justifyBetween
                alignCenter
                variant="borderTop"
                spacing={{ mb: 3 }}
                width="100%"
              >
                <Text variant="titleSmall">Set as Primary</Text>
                <Checkbox
                  checked={formFields.primary}
                  onChange={updateFormField('primary')}
                />
              </View>
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


AddressScreen.navigationOptions = ({ navigation, navigationOptions }) => {
  const { params = {} } = navigation.state;

  return {
    headerTitle: <HeaderTitle title={params.title} />,
    headerBackImage: BackButton,
    headerLeftContainerStyle: { ...Spacing.getStyles({ pt: 2, pl: 3 }) },
    headerStyle: {
      ...navigationOptions.headerStyle as {},
      ...Views.borderBottom,
      backgroundColor: Colors.white,
    },
    headerRightContainerStyle: { ...Spacing.getStyles({ pt: 2, pr: 3 }) },
    headerRight: params.isExistingAddress
    && !params.isOnlyAddress
      ? (
        <View
          alignCenter
          onPress={() => {
            params.handleDelete();
            navigation.goBack();
          }}
        >
          <BinIconRed />
        </View>
      ) : null,
  };
};

export default AddressScreen;
