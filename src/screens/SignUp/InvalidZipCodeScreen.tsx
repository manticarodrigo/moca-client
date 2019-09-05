import React from 'react';

import useNavigation from '@src/hooks/useNavigation';

import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import HeaderTitle from '@src/components/HeaderTitle';

import { Views, Spacing, Colors } from '@src/styles';

import BackButton from '@src/components/BackButton';

import InvalidZipCodeImage from '@src/assets/pngs/invalidZipCodeImage.png';

const InvalidZipCodeScreen = () => {
  const navigation = useNavigation();

  const handleButtonPress = () => navigation.navigate('ZipCodeScreen');

  return (
    <View safeArea justifyBetween expand width="100%" spacing={{ mt: 3 }}>
      <View alignCenter spacing={{ mx: 4 }}>
        <Image file={InvalidZipCodeImage} width={74} height={87} />
        <Text variant="error" spacing={{ mt: 3 }}>
          {"Sorry, MOCA hasn't made it"}
        </Text>
        <Text variant="error">
          to your area yet
        </Text>
        <Text variant="regular" spacing={{ mt: 2 }}>
          Thanks for your interest in Moca!
        </Text>
        <Text variant="regular" spacing={{ mt: 1, p: 3 }}>
          We are currently not available in your area, but we are working hard to change
          that Please provide your email with us to receive updates and therapy
          tips! You will receive a $50 discount on your first therapy session when
          we become available in your area.
        </Text>
      </View>
      <View alignCenter>
        <View width="100%" spacing={{ px: 4, pb: 4 }}>
          <Button onPress={handleButtonPress}>
            Continue
          </Button>
        </View>
      </View>
    </View>
  );
};

InvalidZipCodeScreen.navigationOptions = () => ({
  headerTitle: <HeaderTitle title="Location" />,
  headerBackImage: BackButton,
  headerLeftContainerStyle: { ...Spacing.getStyles({ pt: 2, pl: 3 }) },
  headerStyle: {
    ...Views.borderBottom,
    backgroundColor: Colors.white,
    height: 80,
  },
});
export default InvalidZipCodeScreen;
