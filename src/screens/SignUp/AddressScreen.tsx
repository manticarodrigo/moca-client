import React, { useState, useRef } from 'react';
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

import { updateUserInfomation } from '@src/store/actions/RegistrationAction';

const AddressScreen = ({ navigation }: NavigationStackScreenProps) => {
  const { store, dispatch } = useStore();
  const { registrationState: { userInformation } } = store;

  const [formFields, setFormFields] = useState({
    street: '',
    apartmentNumber: '',
    city: '',
    state: '',
  });

  const apartmentField = useRef(null);
  const cityField = useRef(null);
  const stateField = useRef(null);

  const isAnyFieldEmpty = Object.values(formFields).includes('');
  const isButtonDisabled = isAnyFieldEmpty;


  const handleButtonPress = () => {
    const newAddress = userInformation.address.map((x) => ({ ...x }));
    newAddress.push({ ...formFields });
    dispatch(updateUserInfomation({ address: newAddress }));
    navigation.navigate('TabStack');
  };

  const handleFormFields = (fieldName: string, text: string) => {
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
            <View alignCenter>
              <View row>
                <Text variant="title" spacing={{ mt: 3 }}>Thanks for signing up, </Text>
                <Text variant="title" spacing={{ mt: 3 }}>{userInformation.name}</Text>
              </View>
              <Text variant="regular" spacing={{ mt: 1 }}>
              What is your preferred address for treatment?
              </Text>
            </View>
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
                Continue
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

AddressScreen.navigationOptions = () => ({
  headerTitle: <HeaderTitle title="Your Address" />,
  headerBackImage: BackButton,
  headerLeftContainerStyle: { ...Spacing.getStyles({ pt: 2, pl: 3 }) },
  headerStyle: {
    ...Views.borderBottom,
    backgroundColor: Colors.white,
    height: 80,
  },
});

export default AddressScreen;
