import React, { ComponentClass } from 'react';
import { registerRootComponent } from 'expo';
import { InitialProps } from 'expo/build/launch/withExpoRoot.types';
import { activateKeepAwake } from 'expo-keep-awake'; // eslint-disable-line import/no-extraneous-dependencies

import StoreProvider from '@src/StoreProvider';
import NavigationProvider from '@src/NavigationProvider';

const App = () => (
  <StoreProvider>
    <NavigationProvider />
  </StoreProvider>
);

if (__DEV__) { // eslint-disable-line no-undef
  activateKeepAwake();
}

registerRootComponent(App as unknown as ComponentClass<InitialProps, {}>);
