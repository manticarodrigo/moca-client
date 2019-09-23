import React from 'react';

import View from '@src/components/View';
import Button from '@src/components/Button';

import { ScreenProps } from '@src/stacks/ProfileStack';

type Props = ScreenProps<'profileScreen'>;

const ProfileScreen = ({ navigation }: Props) => {
  navigation.setOptions({
    title: 'Profile',
  });

  const handleButtonPress = () => navigation.jumpTo('conversationTab');

  return (
    <View flex={1} justifyCenter alignCenter bgColor="lightGrey">
      <Button onPress={handleButtonPress}>
        Go to Conversation
      </Button>
    </View>
  );
};

export default ProfileScreen;
