import React, { ComponentClass } from 'react';
import { registerRootComponent } from 'expo';
import { InitialProps } from 'expo/build/launch/withExpoRoot.types';
import { activateKeepAwake } from 'expo-keep-awake'; // eslint-disable-line import/no-extraneous-dependencies
import { ThemeProvider } from 'styled-components/native';

import { theme } from '@src/theme/theme';
import NavigationProvider from '@src/navigator';

const App = () => (
  <ThemeProvider theme={theme}>
    <NavigationProvider />
  </ThemeProvider>
);

if (__DEV__) { // eslint-disable-line no-undef
  activateKeepAwake();
}

registerRootComponent(App as unknown as ComponentClass<InitialProps, {}>);
