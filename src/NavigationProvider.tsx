import React from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import SitemapScreen from '@src/screens/SitemapScreen';

import AuthStack, { ParamList as AuthParamList } from '@src/routes/AuthStack';
import TabStack, { TabParamList, StackParamList } from '@src/routes/TabStack';

type RootParamList = {
  SitemapScreen: undefined;
  AuthStack: undefined;
  TabStack: undefined;
}

type RootNavigationProp = StackNavigationProp<RootParamList>

type AuthNavigationProp<ScreenName extends keyof AuthParamList> = CompositeNavigationProp<
  StackNavigationProp<AuthParamList, ScreenName>,
  RootNavigationProp
>

type TabNavigationProp<ScreenName extends keyof StackParamList> = CompositeNavigationProp<
  StackNavigationProp<StackParamList, ScreenName>,
  CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList>,
    RootNavigationProp
  >
>

export type RootScreenProps<ScreenName extends keyof RootParamList> = {
  navigation: RootNavigationProp;
  route: RouteProp<RootParamList, ScreenName>;
}

export type AuthScreenProps<ScreenName extends keyof AuthParamList> = {
  navigation: AuthNavigationProp<ScreenName>;
  route: RouteProp<AuthParamList, ScreenName>;
}

export type TabScreenProps<ScreenName extends keyof StackParamList> = {
  navigation: TabNavigationProp<ScreenName>;
  route: RouteProp<StackParamList, ScreenName>;
}

const Stack = createStackNavigator<RootParamList>();

const NavigationProvider = () => (
  <NavigationNativeContainer>
    <Stack.Navigator>
      <Stack.Screen name="SitemapScreen" component={SitemapScreen} />
      <Stack.Screen name="TabStack" component={TabStack} options={{ header: null }} />
      <Stack.Screen name="AuthStack" component={AuthStack} options={{ header: null }} />
    </Stack.Navigator>
  </NavigationNativeContainer>
);

export default NavigationProvider;
