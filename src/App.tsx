import React, { useState, useRef, useEffect } from 'react';
import { Alert, StatusBar } from 'react-native';
import { NavigationActions, NavigationContainerComponent } from 'react-navigation';
import { registerRootComponent } from 'expo';

// eslint-disable-next-line import/no-extraneous-dependencies
import { activateKeepAwake } from 'expo-keep-awake';

import { instance as apiInstance } from '@src/services/api';

import storage from '@src/services/storage';

import useStore from '@src/hooks/useStore';
import { logoutUser, updateUserState } from '@src/store/actions/UserAction';

import StoreProvider from '@src/StoreProvider';
import NavigationProvider from '@src/NavigationProvider';

import { Typography } from '@src/styles';

const AppStateHandler = ({ navigatorRef, children }) => {
  const { store, dispatch } = useStore();
  const showedAlert = useRef(false);

  useEffect(() => {
    const onMount = async () => {
      showedAlert.current = false;

      if (!store.user.token) {
        const local = await storage.retrieveUser() || {};

        dispatch(updateUserState({ ...local, storageReady: true }));
      }

      const navigation = navigatorRef.current as NavigationContainerComponent;

      apiInstance.interceptors.response.use((response) => response, (error) => {
        if (error.response.status === 401) {
          dispatch(logoutUser());

          navigation.dispatch(
            NavigationActions.navigate({ routeName: 'OnboardingScreen' }),
          );

          if (!showedAlert.current) {
            Alert.alert('Session ended', 'You have been logged out.\n\nTo log back login, please use the link below the registration button.');
            showedAlert.current = true;
          }
        }

        return Promise.reject(error);
      });
    };

    onMount();
  }, [dispatch, store.user.token]);

  return children;
};

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
