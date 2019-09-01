import React from 'react';
import { StatusBar } from 'react-native';

import useNavigation from '@src/hooks/useNavigation';
import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';
import Button from '@src/components/Button';

const SelectionScreen = () => {

  return (
    <View safeArea expand alignCenter>
      <StatusBar barStyle='dark-content' />
      <View spacing={{ pt: 5 }}>
        <Text variant="title">Please select your</Text>
        <Text variant="title">Moca</Text>
        <Text variant="title">Profile</Text>
      </View>
    </View>
  );
}

SelectionScreen.navigationOptions = {
  header: null,
};

export default SelectionScreen;
