import React, { useState, useEffect } from 'react';
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
  const [{ registrationState: { userInformation } }, dispatch] = useStore();
  const [zipCode, setZipCode] = useState('');
  const [isZipCodeValid, setIsZipCodeValid] = useState(true);

  const validateZipCode = (userInput: string) => {
    const regexpNumber = new RegExp('^[+ 0-9]{5}$');
    return regexpNumber.test(userInput);
  };

  useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(userInformation, 'zipCode')) {
      setZipCode(userInformation.zipCode);
      if (!validateZipCode(userInformation.zipCode)) setIsZipCodeValid(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLocation = () => true; // api call to check zipCode availability

  const handleButtonPress = () => {
    // add param to navigation with user's location later
    dispatch(updateUserInfomation({ zipCode }));
    if (validateZipCode(zipCode)) {
      setIsZipCodeValid(true);
      if (getLocation()) {
        navigation.navigate('RegistrationScreen');
      } else navigation.navigate('InvalidZipCodeScreen');
    } else setIsZipCodeValid(false);
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
              maxLength={5}
            />
            {!isZipCodeValid
              && (
                <Text spacing={{ mt: 1 }} variant="errorSmall">
                  Please enter a valid Zip code
                </Text>
              )}
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
