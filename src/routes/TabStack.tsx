import React from 'react';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import DashboardStack from '@src/routes/DashboardStack';
import ScheduleStack from '@src/routes/ScheduleStack';
import ConversationStack from '@src/routes/ConversationStack';
import ProfileStack from '@src/routes/ProfileStack';

import { Views } from '@src/styles';

import {
  DashboardTabIcon,
  ScheduleTabIcon,
  ConversationTabIcon,
  ProfileTabIcon,
} from '@src/icons';

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
    tabBarOptions={{
      showLabel: false,
      style: { ...Views.borderTop, height: 72 },
    }}
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

export default TabStack;
