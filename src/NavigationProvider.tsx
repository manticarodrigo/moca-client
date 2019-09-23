import React, { useEffect } from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { mockImg } from '@src/services/mock';

import { setUser } from '@src/store/actions/UserActions';
import useStore from '@src/hooks/useStore';

import ConversationStack from '@src/stacks/ConversationStack';
import DashboardStack from '@src/stacks/DashboardStack';

const Tab = createBottomTabNavigator();

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
      <Tab.Navigator>
        <Tab.Screen name="dashboardStack" component={DashboardStack} />
        <Tab.Screen name="conversationStack" component={ConversationStack} />
      </Tab.Navigator>
    </NavigationNativeContainer>
  );
};

export default NavigationProvider;
