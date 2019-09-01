import React from 'react';

import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';

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
import { Views, Typography, Colors } from '@src/styles';
import { HomeTabIcon, ScheduleTabIcon, ChatTabIcon, ProfileTabIcon } from '@src/components/icons';

import SitemapScreen from '@src/screens/SitemapScreen';
import OnboardingScreen from '@src/screens/OnboardingScreen';
import DashboardScreen from '@src/screens/DashboardScreen';
import ScheduleScreen from '@src/screens/ScheduleScreen';
import ChatListScreen from '@src/screens/ChatListScreen';
import ChatScreen from '@src/screens/ChatScreen';
import ProfileScreen from '@src/screens/ProfileScreen';
import SelectionScreen from '@src/screens/SignUp/SelectionScreen';

const defaultNavConfig: StackNavigatorConfig = {
  headerLayoutPreset: 'center',
  defaultNavigationOptions: ({ navigation }) => ({
    title: navigation.state.routeName,
    headerStyle: {
      borderBottomWidth: 0,
      height: 60,
      backgroundColor: Colors.primary,
>>>>>>> Stashed changes
    },
  },
  Dashboard: {
    initialRouteName: 'DashboardScreen',
    screens: {
      DashboardScreen,
    },
  },
};

export const authConfig = {
  OnboardingScreen,
};

const SitemapScreen = () => {
  const navigation = useNavigation();
  const handleNavigate = (screenName) => navigation.navigate(screenName);

  const screens = Object.keys(authConfig).concat(
    Object.values(tabConfig).flatMap((tab) => Object.keys(tab.screens)),
  );

  return screens.map((name: string) => (
    <SitemapCard
      key={name}
      name={name}
      onPress={handleNavigate}
    />
  ));
};

const SitemapCard = ({ name, onPress }) => {
  const handleCardPress = () => onPress(name);

  return (
    <Flex direction="column" spacing={['p', 3]}>
      <Card key={name} onPress={handleCardPress}>
        <Text>{name}</Text>
      </Card>
    </Flex>
  );
};

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
  {
    initialRouteName,
    ...Header.getBase(tabName),
  },
);

const TabStack = createBottomTabNavigator(
  Object.entries(tabConfig).reduce(
    (tabsMap, [tabName, { initialRouteName, screens }]) => {
      const stack = _createStack(tabName, initialRouteName, screens);

      // remove tab bar in nested screens
      stack.navigationOptions = ({ navigation }) => ({
        tabBarVisible: !(navigation.state.index > 0),
      });

      tabsMap[tabName] = stack;

      return tabsMap;
    }, {},
  ),
);


const AuthStack = createStackNavigator(
  {
    SitemapScreen,
    ...authConfig,
  },
  {
    initialRouteName: 'SitemapScreen',
    ...Header.getBase('Sitemap'),
  },
);

const AppStack = createSwitchNavigator(
  {
    Auth: AuthStack,
    Tab: TabStack,
  },
  {
    initialRouteName: 'Auth',
  },
);

export default createAppContainer(AppStack);
