import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { registerRootComponent } from 'expo';

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

registerRootComponent(App);
