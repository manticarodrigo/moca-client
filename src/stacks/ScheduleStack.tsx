import React from 'react';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import { TabNavigationProp } from '@src/NavigationProvider';

import Header from '@src/components/Header';

import ScheduleScreen from '@src/screens/ScheduleScreen';

type ParamList = {
  scheduleScreen: undefined;
};

type NavigationProp<ScreenName extends keyof ParamList> = CompositeNavigationProp<
  TabNavigationProp<'scheduleTab'>,
  StackNavigationProp<ParamList, ScreenName>
>;

export type ScreenProps<ScreenName extends keyof ParamList> = {
  navigation: NavigationProp<ScreenName>;
  route: RouteProp<ParamList, ScreenName>;
}

const Stack = createStackNavigator<ParamList>();

const ScheduleStack = () => (
  <Stack.Navigator
    initialRouteName="scheduleScreen"
    screenOptions={{ header: Header }}
    headerMode="screen"
  >
    <Stack.Screen name="scheduleScreen" component={ScheduleScreen} />
  </Stack.Navigator>
);

export default ScheduleStack;
