import React from 'react';

import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';

import { Header } from '@src/styles';

import ChatListScreen from '@src/screens/ChatListScreen/ChatListScreen';
import ChatScreen from '@src/screens/ChatScreen/ChatScreen';
import DashboardScreen from '@src/screens/DashboardScreen/DashboardScreen';
import OnboardingScreen from '@src/screens/OnboardingScreen/OnboardingScreen';

import useNavigation from '@src/hooks/useNavigation';

import View from '@src/components/View';
import Card from '@src/components/Card';
import Text from '@src/components/Text';

export const tabConfig = {
  Chat: {
    initialRouteName: 'ChatListScreen',
    screens: {
      ChatListScreen,
      ChatScreen,
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

  const screensNames = Object.keys(authConfig).concat(
    Object.values(tabConfig).flatMap((tab) => Object.keys(tab.screens)),
  );

  return screensNames.map((name: string) => (
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
    <View spacing={{ p: 3 }}>
      <Card key={name} onPress={handleCardPress}>
        <Text>{name}</Text>
      </Card>
    </View>
  );
};

const _createStack = (tabName, initialRouteName, screens) => createStackNavigator(
  Object.entries(screens).reduce(
    (screenMap, [name, component]) => {
      screenMap[name] = component;

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
  { SitemapScreen, ...authConfig },
  { initialRouteName: 'SitemapScreen', ...Header.getBase('Sitemap') },
);

const AppStack = createSwitchNavigator(
  { Auth: AuthStack, Tab: TabStack },
  { initialRouteName: 'Auth' },
);

export default createAppContainer(AppStack);
