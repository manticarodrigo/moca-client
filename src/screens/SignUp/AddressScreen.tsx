import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native';


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
  const userName = navigation.getParam('name', '');

  const [formFields, setFormFields] = useState({
    street: '',
    apartmentNumber: '',
    city: '',
    state: '',
  });
  const [{ registrationState: { userInformation } }, dispatch] = useStore();
  const isAnyFieldEmpty = Object.values(formFields).includes('');
  const isButtonDisabled = isAnyFieldEmpty;


  const handleButtonPress = () => {
    dispatch(updateUserInfomation({ address: { ...formFields } }));
    navigation.navigate('DashboardScreen');
  };


  const handleFormFields = (name: string, text: string) => {
    setFormFields({ ...formFields, [name]: text });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
    >
      <View safeArea flex={1} spacing={{ mt: 3 }} justifyEnd>
        <View alignCenter>
          <View row>
            <Text variant="title" spacing={{ mt: 3 }}>Thanks for signing up, </Text>
            <Text variant="title" spacing={{ mt: 3 }}>{userName}</Text>
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
            onChangeText={(text) => handleFormFields('street', text)}
          />
          <FormField
            placeholder="Apartment Number"
            value={formFields.apartmentNumber}
            returnKeyType="next"
            onChangeText={(text) => handleFormFields('apartmentNumber', text)}
          />
          <FormField
            placeholder="City"
            value={formFields.city}
            returnKeyType="next"
            onChangeText={(text) => handleFormFields('city', text)}
          />
          <FormField
            placeholder="State"
            value={formFields.state}
            returnKeyType="done"
            onChangeText={(text) => handleFormFields('state', text)}
          />
          <FormField
            placeholder="ZIP Code"
            value={userInformation.zipCode}
            editable={false}
            selectTextOnFocus={false}
          />
        </View>
        <View spacing={{ mx: 3, mt: 3 }}>
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
