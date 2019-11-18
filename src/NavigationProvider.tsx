import React from 'react';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Views, Typography, Colors, Spacing } from '@src/styles';

import BackButton from '@src/components/BackButton';
import TabBar from '@src/components/TabBar';
import TabBarIcon from '@src/components/TabBarIcon';

import OnboardingScreen from '@src/screens/OnboardingScreen';
import SelectionScreen from '@src/screens/SelectionScreen';
import RegistrationScreen from '@src/screens/RegistrationScreen';
import InvalidRegistrationScreen from '@src/screens/InvalidRegistrationScreen';
import AddressScreen from '@src/screens/AddressScreen';
import QualificationsScreen from '@src/screens/QualificationsScreen';
import DashboardScreen from '@src/screens/DashboardScreen';
import HistoryScreen from '@src/screens/HistoryScreen';
import SearchScreen from '@src/screens/SearchScreen';
import ScheduleScreen from '@src/screens/ScheduleScreen';
import ScheduleDayScreen from '@src/screens/ScheduleDayScreen';
import ConversationListScreen from '@src/screens/ConversationListScreen';
import ConversationScreen from '@src/screens/ConversationScreen';
import ProfileScreen from '@src/screens/ProfileScreen';
import ProfileSettingsScreen from '@src/screens/ProfileSettingsScreen';
import AddressSettingsScreen from '@src/screens/AddressSettingsScreen';
import CertificationsScreen from '@src/screens/CertificationsScreen';
import InjuriesScreen from '@src/screens/InjuriesScreen';
import WalletScreen from '@src/screens/WalletScreen';

const defaultNavConfig = {
  cardShadowEnabled: false,
  defaultNavigationOptions: ({ navigation }) => ({
    title: navigation.state.routeName,
    headerStyle: {
      borderBottomWidth: 0,
      height: 60,
      backgroundColor: Colors.primary,
    },
    headerTintColor: Colors.primary,
    headerLeftContainerStyle: { ...Spacing.getStyles({ pt: 2, pl: 3 }) },
    headerBackImage: BackButton,
    headerBackTitle: null,
    headerTitleStyle: {
      ...Typography.getStyles({ size: 3, weight: '700', color: 'white' }),
    },
    headerRight: null,
  }),
};

const AppStack = createSwitchNavigator(
  {

    AuthStack: createStackNavigator({
      OnboardingScreen,
      SelectionScreen,
      RegistrationScreen,
      InvalidRegistrationScreen,
      AddressScreen,
      QualificationsScreen,
    }, defaultNavConfig),

    TabStack: createBottomTabNavigator({

      DashboardTab: createStackNavigator({
        DashboardScreen,
        HistoryScreen,
        InjuriesScreen,
        WalletScreen,
      }, defaultNavConfig),

      ScheduleTab: createStackNavigator({
        ScheduleScreen,
        ScheduleDayScreen,
      }, defaultNavConfig),

      SearchTab: createStackNavigator({
        SearchScreen,
      }, defaultNavConfig),

      ConversationTab: createStackNavigator({
        ConversationListScreen,
        ConversationScreen,
      }, defaultNavConfig),

      ProfileTab: createStackNavigator({
        ProfileScreen,
        ProfileSettingsScreen,
        AddressSettingsScreen,
        AddressScreen,
        CertificationsScreen,
        InjuriesScreen,
        WalletScreen,
      }, defaultNavConfig),

    }, {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: function Icon(props) {
          return <TabBarIcon {...props} navigation={navigation} />;
        },
        tabBarVisible: navigation.state.index < 1,
      }),
      tabBarComponent: TabBar,
      tabBarOptions: {
        showLabel: false,
        style: { ...Views.borderTop, height: 72 },
      },
    }),

  },
);

export default createAppContainer(AppStack);
