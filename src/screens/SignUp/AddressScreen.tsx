import React, { useState } from 'react';

import useNavigation from '@src/hooks/useNavigation';

import BackButton from '@src/components/BackButton';
import View from '@src/components/View';
import Button from '@src/components/Button';
import FormField from '@src/components/FormField';
import Text from '@src/components/Text';
import HeaderTitle from '@src/components/HeaderTitle';

import StreetIcon from '@src/assets/Icons/pinGrey.png';
import ApartmentIcon from '@src/assets/Icons/building.png';

import useStore from '@src/hooks/useStore';
import { updateUserInfomation } from '@src/store/actions/RegistrationAction';

import { Views, Spacing, Colors } from '@src/styles';

const AddressScreen = () => {
  const navigation = useNavigation();
  const name = navigation.getParam('name', '');
  const [street, setStreet] = useState('');
  const [apartment, setApartment] = useState('');
  const [, dispatch] = useStore();


  const handleButtonPress = () => {
    // validation
    dispatch(updateUserInfomation({ address: { street, apartment } }));
    navigation.navigate('OnboardingScreen'); // homeScreen
  };

  return (
    <View safeArea flex={1} justifyBetween width="100%" spacing={{ mt: 3 }}>
      <View alignCenter>
        <View row>
          <Text variant="title" spacing={{ mt: 3 }}>Thanks for signing up, </Text>
          <Text variant="title" spacing={{ mt: 3 }}>{name}</Text>
        </View>
        <Text variant="regular" spacing={{ mt: 1 }}>
          What is your preferred address for treatment?
        </Text>
      </View>
      <View alignCenter>
        <FormField
          placeholder="Street"
          value={street}
          returnKeyType="next"
          onChangeText={(text) => setStreet(text)}
          icon={StreetIcon}
        />
        <FormField
          placeholder="Apartment"
          value={apartment}
          returnKeyType="done"
          onChangeText={(text) => setApartment(text)}
          icon={ApartmentIcon}
        />
      </View>
      <View spacing={{ mx: 3 }}>
        <Button onPress={handleButtonPress}>
          Continue
        </Button>
      </View>
    </View>
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
