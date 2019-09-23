import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import Header from '@src/components/Header';

import DashboardScreen from '@src/screens/DashboardScreen';
import FilterScreen from '@src/screens/FilterScreen';


export type ParamList = {
  dashboardScreen: undefined;
  filterScreen: undefined;
};

export type ScreenProps<ScreenName extends keyof ParamList> = {
  navigation: StackNavigationProp<ParamList, ScreenName>;
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
