import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  NavigationContainer,
} from 'react-navigation';

import { getHeaderTheme } from '@src/theme';

import ChatListScreen from '@src/screens/ChatListScreen/ChatListScreen';
import ChatScreen from '@src/screens/ChatScreen/ChatScreen';
import DashboardScreen from '@src/screens/DashboardScreen/DashboardScreen';

const stackConfig = {
  ChatTab: {
    title: 'Messages',
    initialRouteName: 'ChatListScreen',
    screens: {
      ChatListScreen,
      ChatScreen,
    },
  },
  DashboardTab: {
    title: 'Appointments',
    initialRouteName: 'DashboardScreen',
    screens: {
      DashboardScreen,
    },
  },
};

const tabMap = Object
  .entries(stackConfig)
  .reduce((tabs, [stackName, { title, initialRouteName, screens }]) => ({
    ...tabs,
    [stackName]: createStackNavigator(
      Object
        .entries(screens)
        .reduce((acc, [name, component]) => ({ ...acc, [name]: component }), {}),
      {
        initialRouteName,
        ...getHeaderTheme(title),
      },
    ),
  }), {});

// remove tab bar in nested screens
Object.values(tabMap).forEach((stack: NavigationContainer) => {
  stack.navigationOptions = ({ navigation }) => ({
    tabBarVisible: !(navigation.state.index > 0),
  });
});

export default createAppContainer(createBottomTabNavigator(tabMap));
