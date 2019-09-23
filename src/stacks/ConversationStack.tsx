import React, { useEffect } from 'react';
import { RouteProp } from '@react-navigation/core';

import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import { login } from '@src/store/actions/UserActions';
import useStore from '@src/hooks/useStore';

import Header from '@src/components/Header';

import ConversationListScreen from '@src/screens/ConversationListScreen';
import ConversationScreen from '@src/screens/ConversationScreen';


export type ConversationParamList = {
  conversationListScreen: undefined;
  conversationScreen: { conversation: Conversation };
};

export type ScreenProps<ScreenName extends keyof ConversationParamList> = {
  navigation: StackNavigationProp<ConversationParamList, ScreenName>;
  route: RouteProp<ConversationParamList, ScreenName>;
}

const Stack = createStackNavigator<ConversationParamList>();

const ConversationStack = () => {
  const { dispatch } = useStore();

  useEffect(() => {
    dispatch(login());
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="conversationListScreen"
      screenOptions={{ header: Header }}
      headerMode="screen"
    >
      <Stack.Screen name="conversationListScreen" component={ConversationListScreen} />
      <Stack.Screen name="conversationScreen" component={ConversationScreen} />
    </Stack.Navigator>
  );
};

export default ConversationStack;
