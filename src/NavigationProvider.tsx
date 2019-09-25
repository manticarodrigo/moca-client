import React from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SitemapScreen from '@src/screens/SitemapScreen';

import AuthStack from '@src/routes/AuthStack';
import TabStack from '@src/routes/TabStack';

const Stack = createStackNavigator();

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
