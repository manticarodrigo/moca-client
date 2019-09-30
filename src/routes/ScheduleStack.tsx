import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ScheduleScreen from '@src/screens/ScheduleScreen';

import { primaryScreenOptions } from './config';

export type ParamList = {
  ScheduleScreen: undefined;
};

const Stack = createStackNavigator<ParamList>();

const ScheduleStack = () => (
  <Stack.Navigator screenOptions={primaryScreenOptions}>
    <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} />
  </Stack.Navigator>
);

export default ScheduleStack;
