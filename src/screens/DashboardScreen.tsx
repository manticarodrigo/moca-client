import React from 'react';
import styled, { css } from 'styled-components/native';

import useNavigation from '@src/hooks/useNavigation';
import Button from '@src/components/Button';

const DashboardContainer = styled.View(props => css`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5fcff;
`);

const DashboardScreen = () => {
  const navigation = useNavigation();

  const handleButtonPress = () => navigation.navigate('ChatListScreen');

  return (
    <DashboardContainer>
      <Button onPress={handleButtonPress}>
        Go to chat
      </Button>
    </DashboardContainer>
  );
};

export default DashboardScreen;
