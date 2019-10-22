import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { registerRootComponent } from 'expo';

// eslint-disable-next-line import/no-extraneous-dependencies
import { activateKeepAwake } from 'expo-keep-awake';

import StoreProvider from '@src/StoreProvider';
import NavigationProvider from '@src/NavigationProvider';

import { Typography } from '@src/styles';

const App = () => {
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      await Typography.loadFonts();

      setAppLoaded(true);
    };

    initialize();
  }, []);

  return appLoaded ? (
    <StoreProvider>
      <StatusBar barStyle="light-content" />
      <NavigationProvider />
    </StoreProvider>
  ) : null;
};

if (__DEV__) { // eslint-disable-line no-undef
  activateKeepAwake();
}

registerRootComponent(App);
