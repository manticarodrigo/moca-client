import React from 'react';

import useNavigation from '@src/hooks/useNavigation';
import Button from '@src/components/Button';
import Flex from '@src/components/Flex';

const DashboardScreen = () => {
  const navigation = useNavigation();

  const handleButtonPress = () => navigation.navigate('ChatListScreen');

  return (
    <Flex flex="1" justifyContent="center" alignItems="center" bg="grey">
      <Button text="Go to Chat" onPress={handleButtonPress} />
    </Flex>
  );
};

export default DashboardScreen;
