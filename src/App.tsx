import React, { Component, ComponentClass } from 'react';
import { registerRootComponent } from 'expo';
import { activateKeepAwake } from 'expo-keep-awake';
import { ThemeProvider } from 'styled-components/native';

import { theme } from '@src/theme';
import NavigatioProvider from '@src/Navigator';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <NavigatioProvider />
      </ThemeProvider>
    );
  }
}

if (__DEV__) {
  activateKeepAwake();
}

registerRootComponent(App as ComponentClass<any>);
