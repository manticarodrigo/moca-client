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

<<<<<<< HEAD
<<<<<<< Updated upstream
import { Header } from '@src/styles';

import ChatListScreen from '@src/screens/ChatListScreen/ChatListScreen';
import ChatScreen from '@src/screens/ChatScreen/ChatScreen';
import DashboardScreen from '@src/screens/DashboardScreen/DashboardScreen';
import OnboardingScreen from '@src/screens/OnboardingScreen/OnboardingScreen';

import useNavigation from '@src/hooks/useNavigation';

import Flex from '@src/components/Flex';
import Card from '@src/components/Card';
import Text from '@src/components/Text';

export const tabConfig = {
  Chat: {
    initialRouteName: 'ChatListScreen',
    screens: {
      ChatListScreen,
      ChatScreen,
=======
=======
>>>>>>> master
import { Views, Typography, Colors } from '@src/styles';
import { HomeTabIcon, ScheduleTabIcon, ChatTabIcon, ProfileTabIcon } from '@src/components/icons';

import SitemapScreen from '@src/screens/SitemapScreen';
import OnboardingScreen from '@src/screens/OnboardingScreen';
import DashboardScreen from '@src/screens/DashboardScreen';
import ScheduleScreen from '@src/screens/ScheduleScreen';
import ChatListScreen from '@src/screens/ChatListScreen';
import ChatScreen from '@src/screens/ChatScreen';
import ProfileScreen from '@src/screens/ProfileScreen';
<<<<<<< HEAD
import SelectionScreen from '@src/screens/SignUp/SelectionScreen';
=======
>>>>>>> master

const defaultNavConfig: StackNavigatorConfig = {
  headerLayoutPreset: 'center',
  defaultNavigationOptions: ({ navigation }) => ({
    title: navigation.state.routeName,
    headerStyle: {
      borderBottomWidth: 0,
      height: 60,
      backgroundColor: Colors.primary,
<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> master
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
          return <ChatTabIcon focused={focused} />;
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

<<<<<<< HEAD
<<<<<<< Updated upstream
const _createStack = (tabName, initialRouteName, screens) => createStackNavigator(
  Object.entries(screens).reduce(
    (screenMap, [name, component]) => {
      screenMap[name] = component;
=======
    AuthStack: createStackNavigator({
      SitemapScreen,
      OnboardingScreen,
      SelectionScreen,
    }, defaultNavConfig),
>>>>>>> Stashed changes

      return screenMap;
    }, {},
  ),
=======
const AppStack = createSwitchNavigator(
>>>>>>> master
  {

    AuthStack: createStackNavigator({
      SitemapScreen,
      OnboardingScreen,
    }, defaultNavConfig),

    TabStack: createBottomTabNavigator({

      HomeTab: createStackNavigator({
        DashboardScreen,
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
