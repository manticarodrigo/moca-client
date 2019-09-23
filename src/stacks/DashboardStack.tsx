import React from 'react';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import { TabNavigationProp } from '@src/NavigationProvider';

import Header from '@src/components/Header';

import DashboardScreen from '@src/screens/DashboardScreen';
import FilterScreen from '@src/screens/FilterScreen';


type ParamList = {
  dashboardScreen: undefined;
  filterScreen: undefined;
};

type NavigationProp<ScreenName extends keyof ParamList> = CompositeNavigationProp<
  TabNavigationProp<'dashboardTab'>,
  StackNavigationProp<ParamList, ScreenName>
>;

export type ScreenProps<ScreenName extends keyof ParamList> = {
  navigation: NavigationProp<ScreenName>;
  route: RouteProp<ParamList, ScreenName>;
}

const Stack = createStackNavigator<ParamList>();

const DashboardStack = () => (
  <Stack.Navigator
    initialRouteName="dashboardScreen"
    screenOptions={{ header: Header }}
    headerMode="screen"
  >
    <Stack.Screen name="dashboardScreen" component={DashboardScreen} />
    <Stack.Screen name="filterScreen" component={FilterScreen} />
  </Stack.Navigator>
);

export default DashboardStack;
