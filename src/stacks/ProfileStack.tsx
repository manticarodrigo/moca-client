import React from 'react';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import { TabNavigationProp } from '@src/NavigationProvider';

import Header from '@src/components/Header';

import ProfileScreen from '@src/screens/ProfileScreen';

type ParamList = {
  profileScreen: undefined;
};

type NavigationProp<ScreenName extends keyof ParamList> = CompositeNavigationProp<
  TabNavigationProp<'profileTab'>,
  StackNavigationProp<ParamList, ScreenName>
>;

export type ScreenProps<ScreenName extends keyof ParamList> = {
  navigation: NavigationProp<ScreenName>;
  route: RouteProp<ParamList, ScreenName>;
}

const Stack = createStackNavigator<ParamList>();

const ProfileStack = () => (
  <Stack.Navigator
    initialRouteName="profileScreen"
    screenOptions={{ header: Header }}
    headerMode="screen"
  >
    <Stack.Screen name="profileScreen" component={ProfileScreen} />
  </Stack.Navigator>
);

export default ProfileStack;
