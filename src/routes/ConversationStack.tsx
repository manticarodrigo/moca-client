import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ConversationListScreen from '@src/screens/ConversationListScreen';
import ConversationScreen from '@src/screens/ConversationScreen';

import { primaryScreenOptions, secondaryScreenOptions } from './config';

export type ParamList = {
  ConversationListScreen: undefined;
  ConversationScreen: { conversation: Conversation };
};

const Stack = createStackNavigator<ParamList>();

const ConversationStack = () => (
  <Stack.Navigator screenOptions={primaryScreenOptions}>
    <Stack.Screen name="ConversationListScreen" component={ConversationListScreen} />
    <Stack.Screen
      name="ConversationScreen"
      component={ConversationScreen}
      options={secondaryScreenOptions}
    />
  </Stack.Navigator>
);

export default ConversationStack;
