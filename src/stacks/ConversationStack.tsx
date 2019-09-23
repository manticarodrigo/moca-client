import React from 'react';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import { TabNavigationProp } from '@src/NavigationProvider';

import Header from '@src/components/Header';

import ConversationListScreen from '@src/screens/ConversationListScreen';
import ConversationScreen from '@src/screens/ConversationScreen';


type ParamList = {
  conversationListScreen: undefined;
  conversationScreen: { conversation: Conversation };
};

type NavigationProp<ScreenName extends keyof ParamList> = CompositeNavigationProp<
  TabNavigationProp<'conversationTab'>,
  StackNavigationProp<ParamList, ScreenName>
>;

export type ScreenProps<ScreenName extends keyof ParamList> = {
  navigation: NavigationProp<ScreenName>;
  route: RouteProp<ParamList, ScreenName>;
}

const Stack = createStackNavigator<ParamList>();

const ConversationStack = () => (
  <Stack.Navigator
    initialRouteName="conversationListScreen"
    screenOptions={{ header: Header }}
    headerMode="screen"
  >
    <Stack.Screen name="conversationListScreen" component={ConversationListScreen} />
    <Stack.Screen name="conversationScreen" component={ConversationScreen} />
  </Stack.Navigator>
);

export default ConversationStack;
