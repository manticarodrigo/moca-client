import React, { useEffect } from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import DashboardStack from '@src/stacks/DashboardStack';
import ScheduleStack from '@src/stacks/ScheduleStack';
import ConversationStack from '@src/stacks/ConversationStack';
import ProfileStack from '@src/stacks/ProfileStack';

import { Views } from '@src/styles';

import { setUser } from '@src/store/actions/UserActions';
import useStore from '@src/hooks/useStore';

import {
  DashboardTabIcon,
  ScheduleTabIcon,
  ConversationTabIcon,
  ProfileTabIcon,
} from '@src/icons';
import { mockImg } from '@src/services/mock';

type TabParamList = {
  dashboardTab: undefined;
  scheduleTab: undefined;
  conversationTab: undefined;
  profileTab: undefined;
}

const Tab = createBottomTabNavigator<TabParamList>();

export type TabNavigationProp<
  TabName extends keyof TabParamList
> = BottomTabNavigationProp<TabParamList, TabName>;


const NavigationProvider = () => {
  const { dispatch } = useStore();

  useEffect(() => {
    dispatch(setUser({
      id: '0',
      username: 'John Doe',
      imageUrl: mockImg,
    }));
  }, [dispatch]);

  return (
    <NavigationNativeContainer>
      <Tab.Navigator
        tabBarOptions={{ showLabel: false, style: { ...Views.borderTop, height: 72 } }}
      >
        <Tab.Screen
          name="dashboardTab"
          component={DashboardStack}
          options={{ tabBarIcon: DashboardTabIcon }}
        />
        <Tab.Screen
          name="scheduleTab"
          component={ScheduleStack}
          options={{ tabBarIcon: ScheduleTabIcon }}
        />
        <Tab.Screen
          name="conversationTab"
          component={ConversationStack}
          options={{ tabBarIcon: ConversationTabIcon }}
        />
        <Tab.Screen
          name="profileTab"
          component={ProfileStack}
          options={{ tabBarIcon: ProfileTabIcon }}
        />
      </Tab.Navigator>
    </NavigationNativeContainer>
  );
};

export default NavigationProvider;
