import React, { ComponentClass, useState, useEffect } from 'react';
import { registerRootComponent } from 'expo';
import { InitialProps } from 'expo/build/launch/withExpoRoot.types';
import { activateKeepAwake } from 'expo-keep-awake'; // eslint-disable-line import/no-extraneous-dependencies

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
      <NavigationProvider />
    </StoreProvider>
  ) : null;
};

if (__DEV__) { // eslint-disable-line no-undef
  activateKeepAwake();
}

registerRootComponent(App as unknown as ComponentClass<InitialProps, {}>);
