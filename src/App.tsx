import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { registerRootComponent } from 'expo';

// eslint-disable-next-line import/no-extraneous-dependencies
import { activateKeepAwake } from 'expo-keep-awake';

import storage from '@src/services/storage';

import useStore from '@src/hooks/useStore';
import { updateUserState } from '@src/store/actions/UserAction';

import StoreProvider from '@src/StoreProvider';
import NavigationProvider from '@src/NavigationProvider';

import { Typography } from '@src/styles';

const AppStateHandler = ({ children }) => {
  const { store, dispatch } = useStore();

  useEffect(() => {
    const onMount = async () => {
      // storage.storeUser('');

      if (!store.user.token) {
        const local = await storage.retrieveUser() || {};

        dispatch(updateUserState({ ...local, storageReady: true }));
      }
    };

    onMount();
  }, [dispatch, store.user.token]);

  return children;
};

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
    <>
      <StatusBar barStyle="light-content" />

      <StoreProvider>
        <AppStateHandler>
          <NavigationProvider />
        </AppStateHandler>
      </StoreProvider>
    </>
  ) : null;
};

if (__DEV__) { // eslint-disable-line no-undef
  activateKeepAwake();
}

registerRootComponent(App);
