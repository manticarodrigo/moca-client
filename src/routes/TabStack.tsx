import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import useStore from '@src/hooks/useStore';

import DashboardStack, { ParamList as DashboardParamList } from '@src/routes/DashboardStack';
import ScheduleStack, { ParamList as ScheduleParamList } from '@src/routes/ScheduleStack';
import ConversationStack, { ParamList as ConversationParamList } from '@src/routes/ConversationStack';
import ProfileStack, { ParamList as ProfileParamList } from '@src/routes/ProfileStack';

import { Views } from '@src/styles';

import {
  DashboardTabIcon,
  ScheduleTabIcon,
  ConversationTabIcon,
  ProfileTabIcon,
} from '@src/components/icons';

export type StackParamList =
  & DashboardParamList
  & ScheduleParamList
  & ConversationParamList
  & ProfileParamList

export type TabParamList = {
  DashboardTab: undefined;
  ScheduleTab: undefined;
  ConversationTab: undefined;
  ProfileTab: undefined;
}

const Tab = createBottomTabNavigator<TabParamList>();

const TabStack = () => {
  const { store } = useStore();

  return (
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
      {store.user.type === 'caregiver' && (
        <Tab.Screen
          name="ScheduleTab"
          component={ScheduleStack}
          options={{ tabBarIcon: ScheduleTabIcon }}
        />
      )}
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
};

export default TabStack;
