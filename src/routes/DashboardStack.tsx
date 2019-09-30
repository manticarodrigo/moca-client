import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardScreen from '@src/screens/DashboardScreen';
import FilterScreen from '@src/screens/FilterScreen';

import { primaryScreenOptions } from './config';

export type ParamList = {
  DashboardScreen: undefined;
  FilterScreen: undefined;
};

const Stack = createStackNavigator<ParamList>();

const DashboardStack = () => (
  <Stack.Navigator screenOptions={primaryScreenOptions}>
    <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
    <Stack.Screen name="FilterScreen" component={FilterScreen} />
  </Stack.Navigator>
);

export default DashboardStack;
