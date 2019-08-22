import React, { ComponentClass } from 'react';
import { registerRootComponent } from 'expo';
import { InitialProps } from 'expo/build/launch/withExpoRoot.types';
import { activateKeepAwake } from 'expo-keep-awake'; // eslint-disable-line import/no-extraneous-dependencies
import { ThemeProvider } from 'styled-components/native';

import { theme } from '@src/theme/theme';
import NavProvider from '@src/NavProvider';

const App = () => (
  <ThemeProvider theme={theme}>
    <NavProvider />
  </ThemeProvider>
);

if (__DEV__) { // eslint-disable-line no-undef
  activateKeepAwake();
}

registerRootComponent(App as unknown as ComponentClass<InitialProps, {}>);
