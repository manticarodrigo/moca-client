import React from 'react';

import { useNavigation } from '@react-navigation/core';

import View from '@src/components/View';
import Button from '@src/components/Button';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleButtonPress = () => navigation.navigate('ConversationListScreen');

  return (
    <View flex={1} justifyCenter alignCenter bgColor="lightGrey">
      <Button onPress={handleButtonPress}>
        Go to Conversation
      </Button>
    </View>
  );
};

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

export default ProfileScreen;
