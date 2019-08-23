import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';

import { getHeaderTheme } from '@src/theme/theme';

import ChatListScreen from '@src/screens/ChatListScreen/ChatListScreen';
import ChatScreen from '@src/screens/ChatScreen/ChatScreen';
import DashboardScreen from '@src/screens/DashboardScreen/DashboardScreen';

const tabConfig = {
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

const _createTabs = () => createBottomTabNavigator(
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

const NavProvider = createAppContainer(_createTabs());

export default NavProvider;
