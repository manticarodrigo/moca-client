import React, { useState, useRef } from 'react';
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


const AddressScreen = () => {
  const navigation = useNavigation();
  const [{ registrationState: { userInformation: { name } } }] = useStore();

  const [formFields, setFormFields] = useState({
    street: '',
    apartmentNumber: '',
    city: '',
    state: '',
  });

  const apartmentField = useRef(null);
  const cityField = useRef(null);
  const stateField = useRef(null);

  const [{ registrationState: { userInformation } }, dispatch] = useStore();
  const isAnyFieldEmpty = Object.values(formFields).includes('');
  const isButtonDisabled = isAnyFieldEmpty;


  const handleButtonPress = () => {
    dispatch(updateUserInfomation({ address: { ...formFields } }));
    navigation.navigate('DashboardScreen');
  };


  const handleFormFields = (fieldName: string, text: string) => {
    setFormFields({ ...formFields, [fieldName]: text });
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Header.HEIGHT + 60}
    >
      <View scroll>
        <View safeArea spacing={{ pt: 3 }} alignCenter>
          <View spacing={{ mx: 3 }}>
            <View alignCenter>
              <View row>
                <Text variant="title" spacing={{ mt: 3 }}>Thanks for signing up, </Text>
                <Text variant="title" spacing={{ mt: 3 }}>{name}</Text>
              </View>
              <Text variant="regular" spacing={{ mt: 1 }}>
              What is your preferred address for treatment?
              </Text>
            </View>
            <View spacing={{ mb: 3, mt: 4 }}>
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
            <View spacing={{ mt: 3, mx: 3 }}>
              <Button
                variant={isButtonDisabled ? 'primaryDisabled' : 'primary'}
                onPress={handleButtonPress}
                disabled={isButtonDisabled}
              >
                Continue
              </Button>
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
