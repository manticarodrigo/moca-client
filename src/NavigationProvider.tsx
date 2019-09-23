import React, { useEffect } from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ConversationStack from '@src/stacks/ConversationStack';
import DashboardStack from '@src/stacks/DashboardStack';

import { Views } from '@src/styles';

import { setUser } from '@src/store/actions/UserActions';
import useStore from '@src/hooks/useStore';

import { DashboardTabIcon, ConversationTabIcon } from '@src/icons';
import { mockImg } from '@src/services/mock';

type TabParamList = {
  dashboardTab: undefined;
  conversationTab: undefined;
}

const Tab = createBottomTabNavigator<TabParamList>();

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
          name="conversationTab"
          component={ConversationStack}
          options={{ tabBarIcon: ConversationTabIcon }}
        />
      </Tab.Navigator>
    </NavigationNativeContainer>
  );
};

export default NavigationProvider;
