import React from 'react';

import View from '@src/components/View';
import Button from '@src/components/Button';

import { ScreenProps } from '@src/routes/ProfileStack';

type Props = ScreenProps<'ProfileScreen'>;

const ProfileScreen = ({ navigation }: Props) => {
  navigation.setOptions({ title: 'Profile' });

  const handleButtonPress = () => navigation.navigate('FilterScreen');

  return (
    <View flex={1} justifyCenter alignCenter bgColor="lightGrey">
      <Button onPress={handleButtonPress}>
        Go to Conversation
      </Button>
    </View>
  );
};

export default ProfileScreen;
