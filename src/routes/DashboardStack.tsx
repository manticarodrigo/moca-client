import React from 'react';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import { TabNavigationProp } from '@src/routes/TabStack';

import DashboardScreen from '@src/screens/DashboardScreen';
import FilterScreen from '@src/screens/FilterScreen';

import { primaryScreenOptions } from './config';

type ParamList = {
  DashboardScreen: undefined;
  FilterScreen: undefined;
};

type NavigationProp<ScreenName extends keyof ParamList> = CompositeNavigationProp<
  TabNavigationProp<'DashboardTab'>,
  StackNavigationProp<ParamList, ScreenName>
>;

export type ScreenProps<ScreenName extends keyof ParamList> = {
  navigation: NavigationProp<ScreenName>;
  route: RouteProp<ParamList, ScreenName>;
}

const Stack = createStackNavigator<ParamList>();

const DashboardStack = () => (
  <Stack.Navigator
    initialRouteName="DashboardScreen"
    screenOptions={primaryScreenOptions}
  >
    <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
    <Stack.Screen name="FilterScreen" component={FilterScreen} />
  </Stack.Navigator>
);

export default DashboardStack;
