import React from 'react';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import { TabNavigationProp } from '@src/routes/TabStack';

import ProfileScreen from '@src/screens/ProfileScreen';
import WalletScreen from '@src/screens/WalletScreen';

import { primaryScreenOptions } from './config';

type ParamList = {
  ProfileScreen: undefined;
  WalletScreen: undefined;
};

type NavigationProp<ScreenName extends keyof ParamList> = CompositeNavigationProp<
  TabNavigationProp<'ProfileTab'>,
  StackNavigationProp<ParamList, ScreenName>
>;

export type ScreenProps<ScreenName extends keyof ParamList> = {
  navigation: NavigationProp<ScreenName>;
  route: RouteProp<ParamList, ScreenName>;
}

const Stack = createStackNavigator<ParamList>();

const ProfileStack = () => (
  <Stack.Navigator
    initialRouteName="ProfileScreen"
    screenOptions={primaryScreenOptions}
  >
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ header: null }} />
    <Stack.Screen name="WalletScreen" component={WalletScreen} />
  </Stack.Navigator>
);

export default ProfileStack;
