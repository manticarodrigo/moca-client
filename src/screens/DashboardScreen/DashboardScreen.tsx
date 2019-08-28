import React from 'react';

import useNavigation from '@src/hooks/useNavigation';

import View from '@src/components/View';
import Button from '@src/components/Button';

const DashboardScreen = () => {
  const navigation = useNavigation();

  const handleButtonPress = () => navigation.navigate('ChatListScreen');

  return (
    <View alignment={['fill', 'centerXY']} background="grey">
      <Button onPress={handleButtonPress}>
        Go to Chat
      </Button>
    </View>
  );
};

export default DashboardScreen;
