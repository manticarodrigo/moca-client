import React from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import AuthStack from '@src/stacks/AuthStack';
import DashboardStack from '@src/stacks/DashboardStack';
import ScheduleStack from '@src/stacks/ScheduleStack';
import ConversationStack from '@src/stacks/ConversationStack';
import ProfileStack from '@src/stacks/ProfileStack';

import SitemapScreen from '@src/screens/SitemapScreen';

import { Views } from '@src/styles';

import {
  DashboardTabIcon,
  ScheduleTabIcon,
  ConversationTabIcon,
  ProfileTabIcon,
} from '@src/icons';

type StackParamList = {
  SitemapScreen: undefined;
  AuthStack: undefined;
  TabStack: undefined;
};

const Stack = createStackNavigator<StackParamList>();

type TabParamList = {
  DashboardTab: undefined;
  ScheduleTab: undefined;
  ConversationTab: undefined;
  ProfileTab: undefined;
}

const Tab = createBottomTabNavigator<TabParamList>();

export type TabNavigationProp<
  TabName extends keyof TabParamList
> = BottomTabNavigationProp<TabParamList, TabName>;

const TabStack = () => (
  <Tab.Navigator
    tabBarOptions={{ showLabel: false, style: { ...Views.borderTop, height: 72 } }}
  >
    <Tab.Screen
      name="DashboardTab"
      component={DashboardStack}
      options={{ tabBarIcon: DashboardTabIcon }}
    />
    <Tab.Screen
      name="ScheduleTab"
      component={ScheduleStack}
      options={{ tabBarIcon: ScheduleTabIcon }}
    />
    <Tab.Screen
      name="ConversationTab"
      component={ConversationStack}
      options={{ tabBarIcon: ConversationTabIcon }}
    />
    <Tab.Screen
      name="ProfileTab"
      component={ProfileStack}
      options={{ tabBarIcon: ProfileTabIcon }}
    />
  </Tab.Navigator>
);

const NavigationProvider = () => (
  <NavigationNativeContainer>
    <Stack.Navigator screenOptions={{ header: null }}>
      <Stack.Screen name="SitemapScreen" component={SitemapScreen} />
      <Stack.Screen name="TabStack" component={TabStack} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
    </Stack.Navigator>
  </NavigationNativeContainer>
);

export default NavigationProvider;
