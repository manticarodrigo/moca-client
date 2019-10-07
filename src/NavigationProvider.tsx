import React from 'react';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Views, Typography, Colors, Spacing } from '@src/styles';

import BackButton from '@src/components/BackButton';
import TabBar from '@src/components/TabBar';
import TabBarIcon from '@src/components/TabBarIcon';

import SitemapScreen from '@src/screens/SitemapScreen';
import OnboardingScreen from '@src/screens/OnboardingScreen';
import DashboardScreen from '@src/screens/DashboardScreen';
import FilterScreen from '@src/screens/FilterScreen';
import ScheduleScreen from '@src/screens/ScheduleScreen';
import ConversationListScreen from '@src/screens/ConversationListScreen';
import ConversationScreen from '@src/screens/ConversationScreen';
import ProfileScreen from '@src/screens/ProfileScreen';
import SelectionScreen from '@src/screens/SignUp/SelectionScreen';
import InvalidZipCodeScreen from '@src/screens/SignUp/InvalidZipCodeScreen';
import RegistrationScreen from '@src/screens/SignUp/RegistrationScreen';
import InvalidMedicareScreen from '@src/screens/SignUp/InvalidMedicareScreen';
import AddressScreen from '@src/screens/SignUp/AddressScreen';
import QualificationsScreen from '@src/screens/SignUp/QualificationsScreen';
import WalletScreen from '@src/screens/WalletScreen/WalletScreen';
import HistoryScreen from '@src/screens/History/HistoryScreen';

const defaultNavConfig = {
  // headerLayoutPreset: 'center',
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
  }),
};

const AppStack = createSwitchNavigator(
  {
    SitemapScreen,

    AuthStack: createStackNavigator({
      OnboardingScreen,
      SelectionScreen,
      InvalidZipCodeScreen,
      RegistrationScreen,
      InvalidMedicareScreen,
      AddressScreen,
      QualificationsScreen,
    }, defaultNavConfig),

    TabStack: createBottomTabNavigator({

      DashboardTab: createStackNavigator({
        DashboardScreen,
        FilterScreen,
      }, defaultNavConfig),

      ScheduleTab: createStackNavigator({
        ScheduleScreen,
      }, defaultNavConfig),

      ConversationTab: createStackNavigator({
        ConversationListScreen,
        ConversationScreen,
      }, defaultNavConfig),

      ProfileTab: createStackNavigator({
        ProfileScreen,
        WalletScreen,
        HistoryScreen,
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
  { initialRouteName: 'SitemapScreen' },
);

export default createAppContainer(AppStack);
