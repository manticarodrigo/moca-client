/* eslint-disable react/display-name */
import React from 'react';

import {
  StackNavigatorConfig,
  TabNavigatorConfig,
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';

import { Views, Typography, Colors } from '@src/styles';
import { HomeTabIcon, ScheduleTabIcon } from '@src/components/icons';

import SitemapScreen from '@src/screens/SitemapScreen';
import OnboardingScreen from '@src/screens/OnboardingScreen';
import DashboardScreen from '@src/screens/DashboardScreen';
import ChatListScreen from '@src/screens/ChatListScreen';
import ChatScreen from '@src/screens/ChatScreen/ChatScreen';

const defaultNavConfig: StackNavigatorConfig = {
  headerLayoutPreset: 'center',
  defaultNavigationOptions: ({ navigation }) => ({
    title: navigation.state.routeName,
    headerStyle: {
      borderBottomWidth: 0,
      height: 60,
      backgroundColor: Colors.primary,
    },
    headerTintColor: Colors.primary,
    headerBackTitle: null,
    headerTitleStyle: {
      ...Typography.getStyles({ size: 3, weight: '700', color: 'white' }),
    },
  }),
};

const defaultTabConfig: TabNavigatorConfig = {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;

      switch (routeName) {
        case 'HomeTab':
          return <HomeTabIcon focused={focused} />;
        case 'ChatTab':
          return <ScheduleTabIcon focused={focused} />;
        default:
          return null;
      }
    },
    tabBarVisible: navigation.state.index < 1,
    tabBarOptions: {
      showLabel: false,
      style: {
        ...Views.borderTop,
        height: 72,
      },
    },
  }),
};

const AuthStack = createStackNavigator({
  SitemapScreen,
  OnboardingScreen,
}, defaultNavConfig);

const TabStack = createBottomTabNavigator({

  HomeTab: createStackNavigator({
    DashboardScreen,
  }, defaultNavConfig),

  ChatTab: createStackNavigator({
    ChatListScreen,
    ChatScreen,
  }, defaultNavConfig),

}, defaultTabConfig);

const AppStack = createSwitchNavigator(
  { Auth: AuthStack, Tab: TabStack },
  { initialRouteName: 'Auth' },
);

export default createAppContainer(AppStack);
