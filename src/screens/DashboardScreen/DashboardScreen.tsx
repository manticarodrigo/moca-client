import React from 'react';

import useNavigation from '@src/hooks/useNavigation';
import Button from '@src/components/Button';
import Flex from '@src/components/Flex';

const DashboardScreen = () => {
  const navigation = useNavigation();

  const handleButtonPress = () => navigation.navigate('ChatListScreen');

  return (
    <Flex alignment="flexCenterXY" background="grey">
      <Button onPress={handleButtonPress}>
        Go to Chat
      </Button>
    </Flex>
  );
};

export default DashboardScreen;
