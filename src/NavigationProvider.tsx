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
import { HomeTabIcon, ScheduleTabIcon, MessagesTabIcon, ProfileTabIcon } from '@src/components/icons';

import SitemapScreen from '@src/screens/SitemapScreen';
import OnboardingScreen from '@src/screens/OnboardingScreen';
import DashboardScreen from '@src/screens/DashboardScreen';
import FilterScreen from '@src/screens/DashboardScreen/FilterScreen';
import ScheduleScreen from '@src/screens/ScheduleScreen';
import ChatListScreen from '@src/screens/ChatListScreen';
import ChatScreen from '@src/screens/ChatScreen';
import ProfileScreen from '@src/screens/ProfileScreen';

const defaultNavConfig: StackNavigatorConfig = {
  headerLayoutPreset: 'center',
  cardShadowEnabled: false,
  transitionConfig: () => ({
    containerStyle: {
      backgroundColor: Colors.primary,
    },
  }),
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
        case 'ScheduleTab':
          return <ScheduleTabIcon focused={focused} />;
        case 'ChatTab':
          return <MessagesTabIcon focused={focused} />;
        case 'ProfileTab':
          return <ProfileTabIcon focused={focused} />;
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

const AppStack = createSwitchNavigator(
  {

    AuthStack: createStackNavigator({
      SitemapScreen,
      OnboardingScreen,
    }, defaultNavConfig),

    TabStack: createBottomTabNavigator({

      HomeTab: createStackNavigator({
        FilterScreen,
      }, defaultNavConfig),

      ScheduleTab: createStackNavigator({
        ScheduleScreen,
      }, defaultNavConfig),

      ChatTab: createStackNavigator({
        ChatListScreen,
        ChatScreen,
      }, defaultNavConfig),

      ProfileTab: createStackNavigator({
        ProfileScreen,
      }, defaultNavConfig),

    }, defaultTabConfig),

  },
  { initialRouteName: 'AuthStack' },
);

export default createAppContainer(AppStack);
