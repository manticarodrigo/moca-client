import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import OnboardingScreen from '@src/screens/OnboardingScreen';
import SelectionScreen from '@src/screens/SignUp/SelectionScreen';
import RegistrationScreen from '@src/screens/SignUp/RegistrationScreen';
import InvalidZipCodeScreen from '@src/screens/SignUp/InvalidZipCodeScreen';
import InvalidMedicareScreen from '@src/screens/SignUp/InvalidMedicareScreen';
import AddressScreen from '@src/screens/SignUp/AddressScreen';
import QualificationsScreen from '@src/screens/SignUp/QualificationsScreen';

import { secondaryScreenOptions } from './config';

export type ParamList = {
  OnboardingScreen: undefined;
  SelectionScreen: undefined;
  RegistrationScreen: undefined;
  InvalidZipCodeScreen: undefined;
  InvalidMedicareScreen: undefined;
  AddressScreen: { name: string };
  QualificationsScreen: { name: string };
};

const Stack = createStackNavigator<ParamList>();

const AuthStack = () => (
  <Stack.Navigator screenOptions={secondaryScreenOptions}>
    <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ header: null }} />
    <Stack.Screen name="SelectionScreen" component={SelectionScreen} />
    <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
    <Stack.Screen name="InvalidZipCodeScreen" component={InvalidZipCodeScreen} />
    <Stack.Screen name="InvalidMedicareScreen" component={InvalidMedicareScreen} />
    <Stack.Screen name="AddressScreen" component={AddressScreen} />
    <Stack.Screen name="QualificationsScreen" component={QualificationsScreen} />
  </Stack.Navigator>
);

export default AuthStack;
