import React from 'react';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import { TabNavigationProp } from '@src/routes/TabStack';

import ScheduleScreen from '@src/screens/ScheduleScreen';

import { primaryScreenOptions } from './config';

type ParamList = {
  ScheduleScreen: undefined;
};

type NavigationProp<ScreenName extends keyof ParamList> = CompositeNavigationProp<
  TabNavigationProp<'ScheduleTab'>,
  StackNavigationProp<ParamList, ScreenName>
>;

export type ScreenProps<ScreenName extends keyof ParamList> = {
  navigation: NavigationProp<ScreenName>;
  route: RouteProp<ParamList, ScreenName>;
}

const Stack = createStackNavigator<ParamList>();

const ScheduleStack = () => (
  <Stack.Navigator
    initialRouteName="ScheduleScreen"
    screenOptions={primaryScreenOptions}
  >
    <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} />
  </Stack.Navigator>
);

export default ScheduleStack;
