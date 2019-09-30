import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '@src/screens/ProfileScreen';
import WalletScreen from '@src/screens/WalletScreen';

import { primaryScreenOptions } from './config';

export type ParamList = {
  ProfileScreen: undefined;
  WalletScreen: undefined;
};

const Stack = createStackNavigator<ParamList>();

const ProfileStack = () => (
  <Stack.Navigator screenOptions={primaryScreenOptions}>
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ header: null }} />
    <Stack.Screen name="WalletScreen" component={WalletScreen} />
  </Stack.Navigator>
);

export default ProfileStack;
