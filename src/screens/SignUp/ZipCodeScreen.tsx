import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';

import useNavigation from '@src/hooks/useNavigation';
import useStore from '@src/hooks/useStore';
import { updateUserInfomation } from '@src/store/actions/RegistrationAction';

import View from '@src/components/View';
import BackDropView from '@src/components/BackdropView';
import Image from '@src/components/Image';
import Text from '@src/components/Text';
import Button from '@src/components/Button';

import zipCodeImage from '@src/assets/pngs/zipCodeImage.png';
import FormField from '@src/components/FormField';

const ZipCodeScreen = () => {
  const navigation = useNavigation();
  const [, dispatch] = useStore();
  const [zipCode, setZipCode] = useState('');

  const handleButtonPress = () => {
    // api call, validate zipcode then
    // if zipCode avalible
    // add param to navigation with user's location
    dispatch(updateUserInfomation({ zipCode }));
    navigation.navigate('RegistrationScreen');
    // else
    // navigation.navigate('InvalidZipCodeScreen');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
    >
      <BackDropView pt={1} hasArrow>
        <View
          spacing={{ mt: 5, px: 4 }}
          alignCenter
          flex={1}
          width="100%"
          justifyEnd
        >
          <View alignCenter>
            <Image file={zipCodeImage} width={74} height={87} />
            <Text variant="title" spacing={{ mt: 4 }}>Where are you located?</Text>
            <Text variant="regular" spacing={{ mt: 2 }}>
              {"Enter your zip code to check MOCA's"}
            </Text>
            <Text variant="regular">
              availability in your area
            </Text>
          </View>
          <View alignCenter width="100%" spacing={{ mt: 4 }}>
            <FormField
              placeholder="Zip code"
              value={zipCode}
              returnKeyType="done"
              keyboardType="number-pad"
              onChangeText={(text) => setZipCode(text)}
            />
          </View>
          <View width="100%" spacing={{ mt: 4 }}>
            <Button
              variant={zipCode === '' ? 'primaryDisabled' : 'primary'}
              {...(zipCode !== '' ? { onPress: handleButtonPress } : '')}
            >
              Continue
            </Button>
          </View>
          <View flex={1} />
        </View>
      </BackDropView>
    </KeyboardAvoidingView>
  );
};

ZipCodeScreen.navigationOptions = {
  header: null,
};
export default ZipCodeScreen;
