import React, { ComponentClass } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { registerRootComponent } from 'expo';
import { activateKeepAwake } from 'expo-keep-awake';

import DashboardScreen from '@src/screens/DashboardScreen';
import ChatScreen from '@src/screens/ChatScreen';

const AppNavigator = createStackNavigator(
  {
    Dashboard: DashboardScreen,
    Chat: ChatScreen,
  },
  {
    initialRouteName: 'Dashboard',
  },
);

if (__DEV__) {
  activateKeepAwake();
}

const AppContainer = createAppContainer(AppNavigator);

registerRootComponent(AppContainer as ComponentClass<any>);
