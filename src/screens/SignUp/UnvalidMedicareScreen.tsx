import React from 'react';

import useNavigation from '@src/hooks/useNavigation';

import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import HeaderTitle from '@src/components/HeaderTitle';
import BackButton from '@src/components/BackButton';

import { Views, Spacing, Colors } from '@src/styles';

import unvalidMediCareImage from '@src/assets/pngs/unvalidZipCodeImage.png';

const UnvalidMediCareScreen = () => {
  const navigation = useNavigation();

  const handleButtonPress = () => navigation.navigate('ZipCodeScreen');

  return (
    <View safeArea justifyBetween expand width="100%" spacing={{ mt: 3 }}>
      <View alignCenter spacing={{ mx: 4 }}>
        <Image file={unvalidMediCareImage} width={74} height={87} />
        <Text variant="error" spacing={{ mt: 3 }}>
          Sorry !
        </Text>
        <Text variant="regular" spacing={{ mt: 2, p: 3 }}>
          Due to regulations we are still working to offer services for Medicare
          patients. Please provide your email and we will notify you when this
          update is complete. You will also receive a $25 discount on your first
          therapy session when the update is complete.
        </Text>
      </View>
      <View alignCenter>
        <View width="100%" spacing={{ px: 4, pb: 4 }}>
          <Button onPress={handleButtonPress}>
            Let us know
          </Button>
        </View>
      </View>
    </View>
  );
};

UnvalidMediCareScreen.navigationOptions = () => ({
  headerTitle: <HeaderTitle title="Medicare" />,
  headerBackImage: BackButton,
  headerLeftContainerStyle: { ...Spacing.getStyles({ pt: 2, pl: 3 }) },
  headerStyle: {
    ...Views.borderBottom,
    backgroundColor: Colors.white,
    height: 80,
  },
});
export default UnvalidMediCareScreen;
