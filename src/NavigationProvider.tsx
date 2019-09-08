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
import { HomeTabIcon, ScheduleTabIcon, ChatTabIcon, ProfileTabIcon } from '@src/components/icons';
import { TransitionConfiguration } from '@src/NavigationTransitions';

import SitemapScreen from '@src/screens/SitemapScreen';
import OnboardingScreen from '@src/screens/OnboardingScreen';
import DashboardScreen from '@src/screens/DashboardScreen';
import ScheduleScreen from '@src/screens/ScheduleScreen';
import ChatListScreen from '@src/screens/ChatListScreen';
import ChatScreen from '@src/screens/ChatScreen';
import ProfileScreen from '@src/screens/ProfileScreen';
import SelectionScreen from '@src/screens/SignUp/SelectionScreen';
import ZipCodeScreen from '@src/screens/SignUp/ZipCodeScreen';
import InvalidZipCodeScreen from '@src/screens/SignUp/InvalidZipCodeScreen';
import RegistrationScreen from '@src/screens/SignUp/RegistrationScreen';
import TermsOfServiceScreen from '@src/screens/SignUp/TermsOfServiceScreen';
import InvalidMediCareScreen from '@src/screens/SignUp/InvalidMedicareScreen';
import AddressScreen from '@src/screens/SignUp/AddressScreen';
import QualificationsScreen from '@src/screens/SignUp/QualificationsScreen';

const defaultNavConfig: StackNavigatorConfig = {
  headerLayoutPreset: 'center',
  cardShadowEnabled: false,
  transitionConfig: TransitionConfiguration,
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
          return <ChatTabIcon focused={focused} />;
        case 'ProfileTab':
          return <ProfileTabIcon focused={focused} />;
        default:
          return null;
      }
    },
    tabBarVisible: navigation.state.index < 1,
    tabBarOptions: {
      showIcon: true,
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
      SelectionScreen,
      ZipCodeScreen,
      InvalidZipCodeScreen,
      RegistrationScreen,
      TermsOfServiceScreen,
      InvalidMediCareScreen,
      AddressScreen,
      QualificationsScreen,
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
