import React, { useState } from 'react';

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
    dispatch(updateUserInfomation({ zipCode }));
    navigation.navigate('RegistrationScreen');
  };


  return (
    <BackDropView pt={1} hasArrow>
      <View safeArea flex={1} width="100%" spacing={{ mt: 5 }}>
        <View alignCenter>
          <Image file={zipCodeImage} width={74} height={87} />
          <Text variant="title" spacing={{ mt: 3 }}>Where are you located?</Text>
          <Text variant="regular" spacing={{ mt: 3 }}>
            {"Enter your zip code to check MOCA's"}
          </Text>
          <Text variant="regular">
            availability in your area
          </Text>
        </View>
        <View alignCenter spacing={{ mt: 2 }}>
          <View width="100%" spacing={{ px: 4, pb: 4 }}>
            <View alignCenter spacing={{ mb: 3 }}>
              <FormField
                placeholder="Zip code"
                value={zipCode}
                returnKeyType="done"
                keyboardType="number-pad"
                onChangeText={(text) => setZipCode(text)}
              />
            </View>
            <Button onPress={handleButtonPress}>
              Continue
            </Button>
          </View>
        </View>
      </View>
    </BackDropView>
  );
};


ZipCodeScreen.navigationOptions = {
  header: null,
};
export default ZipCodeScreen;
