import React from 'react';

import useNavigation from '@src/hooks/useNavigation';
import useStore from '@src/hooks/useStore';
import { updateUserInfomation } from '@src/store/actions/RegistrationAction';
import View from '@src/components/View';
import BackDropView from '@src/components/BackdropView';
import Image from '@src/components/Image';
import Text from '@src/components/Text';
import Button from '@src/components/Button';

import zipCodeImage from '@src/assets/pngs/zipCodeImage.png';

const ZipCodeScreen = () => {
  const navigation = useNavigation();
  const zipCode = '1234';
  const [, dispatch] = useStore();

  const handleButtonPress = () => {
    dispatch(updateUserInfomation({ zipCode }));
    navigation.navigate('RegistrationScreen');
  };


  return (
    <BackDropView pt={1} hasArrow>
      <View safeArea justifyBetween flex={1} width="100%" spacing={{ mt: 5 }}>
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
        <View width="100%" spacing={{ px: 4, pb: 4 }}>
          <Button onPress={handleButtonPress}>
            Continue
          </Button>
        </View>
      </View>
    </BackDropView>
  );
};


ZipCodeScreen.navigationOptions = {
  header: null,
};
export default ZipCodeScreen;
