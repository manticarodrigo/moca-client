import React from 'react';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import { TabNavigationProp } from '@src/routes/TabStack';

import ConversationListScreen from '@src/screens/ConversationListScreen';
import ConversationScreen from '@src/screens/ConversationScreen';

import { primaryScreenOptions, secondaryScreenOptions } from './config';

type ParamList = {
  ConversationListScreen: undefined;
  ConversationScreen: { conversation: Conversation };
};

type NavigationProp<ScreenName extends keyof ParamList> = CompositeNavigationProp<
  TabNavigationProp<'ConversationTab'>,
  StackNavigationProp<ParamList, ScreenName>
>;

export type ScreenProps<ScreenName extends keyof ParamList> = {
  navigation: NavigationProp<ScreenName>;
  route: RouteProp<ParamList, ScreenName>;
}

const Stack = createStackNavigator<ParamList>();

const ConversationStack = () => (
  <Stack.Navigator
    initialRouteName="ConversationListScreen"
    screenOptions={primaryScreenOptions}
  >
    <Stack.Screen name="ConversationListScreen" component={ConversationListScreen} />
    <Stack.Screen
      name="ConversationScreen"
      component={ConversationScreen}
      options={secondaryScreenOptions}
    />
  </Stack.Navigator>
);

export default ConversationStack;
