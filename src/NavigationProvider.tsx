import React from 'react';

import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';

import { getHeaderTheme } from '@src/theme/theme';

import ChatListScreen from '@src/screens/ChatListScreen/ChatListScreen';
import ChatScreen from '@src/screens/ChatScreen/ChatScreen';
import DashboardScreen from '@src/screens/DashboardScreen/DashboardScreen';
import OnboardingScreen from '@src/screens/OnboardingScreen/OnboardingScreen';

import useNavigation from '@src/hooks/useNavigation';
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

  const screens = Object
    .values(tabConfig)
    .flatMap((tab) => Object.keys(tab.screens))
    .concat(Object.keys(authConfig));

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
    <Card key={name} onPress={handleCardPress}>
      <Text>{name}</Text>
    </Card>
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
    ...getHeaderTheme(tabName),
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
    ...getHeaderTheme('Sitemap'),
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
