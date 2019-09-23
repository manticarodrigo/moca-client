import React from 'react';

import { NavigationNativeContainer } from '@react-navigation/native';

import ConversationStack from '@src/stacks/ConversationStack';

const NavigationProvider = () => (
  <NavigationNativeContainer>
    <ConversationStack />
  </NavigationNativeContainer>
);

export default NavigationProvider;
