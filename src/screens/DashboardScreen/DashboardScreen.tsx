import React from 'react';

import useNavigation from '@src/hooks/useNavigation';

import View from '@src/components/View';
import Button from '@src/components/Button';

const DashboardScreen = () => {
  const navigation = useNavigation();

  const handleButtonPress = () => navigation.navigate('ChatListScreen');

  return (
    <View expand center bgColor="lightGrey">
      <Button onPress={handleButtonPress}>
        Go to Chat
      </Button>
    </View>
  );
};

export default DashboardScreen;
