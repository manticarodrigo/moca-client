import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { registerRootComponent } from 'expo';

// eslint-disable-next-line import/no-extraneous-dependencies
import { activateKeepAwake } from 'expo-keep-awake';

import StoreProvider from '@src/StoreProvider';
import NavigationProvider from '@src/NavigationProvider';
import AppStateHandler from '@src/AppStateHandler';

import { Typography } from '@src/styles';

const App = () => {
  const [appLoaded, setAppLoaded] = useState(false);
  const navigationRef = useRef();

  useEffect(() => {
    const initialize = async () => {
      await Typography.loadFonts();

      setAppLoaded(true);
    };

    initialize();
  }, []);

  return appLoaded ? (
    <>
      <StatusBar barStyle="light-content" />

      <StoreProvider>
        <AppStateHandler navigatorRef={navigationRef}>
          <NavigationProvider ref={navigationRef} />
        </AppStateHandler>
      </StoreProvider>
    </>
  ) : null;
};

if (__DEV__) { // eslint-disable-line no-undef
  activateKeepAwake();
}

registerRootComponent(App);
