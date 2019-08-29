import React, { ComponentClass, useState, useEffect } from 'react';
import { registerRootComponent } from 'expo';
import { InitialProps } from 'expo/build/launch/withExpoRoot.types';
import { activateKeepAwake } from 'expo-keep-awake'; // eslint-disable-line import/no-extraneous-dependencies
import * as Font from 'expo-font';

import StoreProvider from '@src/StoreProvider';
import NavigationProvider from '@src/NavigationProvider';

import MuseoSansRounded300 from '@src/assets/fonts/MuseoSansRounded-300.otf';
import MuseoSansRounded500 from '@src/assets/fonts/MuseoSansRounded-500.otf';
import MuseoSansRounded700 from '@src/assets/fonts/MuseoSansRounded-700.otf';

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'family-300': MuseoSansRounded300,
        'family-500': MuseoSansRounded500,
        'family-700': MuseoSansRounded700,
      });

      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  return fontsLoaded ? (
    <StoreProvider>
      <NavigationProvider />
    </StoreProvider>
  ) : null;
};

if (__DEV__) { // eslint-disable-line no-undef
  activateKeepAwake();
}

registerRootComponent(App as unknown as ComponentClass<InitialProps, {}>);
