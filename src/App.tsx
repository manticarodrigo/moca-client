import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Alert, StatusBar } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { registerRootComponent, Notifications } from 'expo';

// eslint-disable-next-line import/no-extraneous-dependencies
import { activateKeepAwake } from 'expo-keep-awake';

import { instance as apiInstance } from '@src/services/api';

import storage from '@src/services/storage';

import useStore from '@src/hooks/useStore';
import { logoutUser, updateUserState } from '@src/store/actions/UserAction';
import { getConversations, getConversation } from '@src/store/actions/ConversationAction';

import StoreProvider from '@src/StoreProvider';
import NavigationProvider from '@src/NavigationProvider';

import { Typography } from '@src/styles';

const AppStateHandler = ({ navigatorRef, children }) => {
  const { store, dispatch } = useStore();
  const pushQueue = useRef([]);
  const showedAlert = useRef(false);

  const navigator = navigatorRef.current;

  const isAuthenticated = useMemo(() => !!(store.user.id && store.user.token), [store.user]);

  const navigate = (routeName, params = undefined) => navigator.dispatch(
    NavigationActions.navigate({ routeName, params }),
  );

  useEffect(() => {
    const onAuthNavigate = () => {
      dispatch(getConversations());

      if (store.user.type === 'PT' && !store.user.preferredAilments.length) {
        navigate('QualificationsScreen');
      } else if (store.user.addresses.length === 0) {
        navigate('AddressScreen', { title: 'Address' });
      } else {
        navigate('DashboardScreen');
      }
    };

    const checkAuth = async () => {
      if (!isAuthenticated) return;
      onAuthNavigate();
    };

    setTimeout(checkAuth);
  }, [isAuthenticated, store.user.storageReady]);


  useEffect(() => {
    const unreadCountTotal = store.conversations.list.reduce(
      // @ts-ignore
      (acc, { unreadCount = 0 }) => acc + unreadCount,
      0,
    );

    Notifications.setBadgeNumberAsync(unreadCountTotal);
  }, [store.conversations.list]);

  Notifications.addListener(({ origin, data, remote }) => {
    if (!navigator) return;

    const { type, params } = data;

    const getChatListOrDetail = () => {
      const tabState = navigator.state.nav.routes.find((stack) => stack.routeName === 'TabStack');
      const chatTabState = tabState.routes.find((tab) => tab.routeName === 'ConversationTab');
      const chatScreenState = chatTabState.routes.find((tab) => tab.routeName === 'ConversationScreen');

      const user = ((chatScreenState || {}).params || {}).user || {};

      if (user.id) {
        return dispatch(getConversation(params.user.id));
      }
      return dispatch(getConversations());
    };

    const handleNewMessage = () => {
      pushQueue.current.push(data);

      if (pushQueue.current.length > 1) return;

      setTimeout(() => {
        if (pushQueue.current.length > 1) getChatListOrDetail();

        pushQueue.current = [];
      }, 1000);

      if (origin === 'selected') navigate('ConversationScreen', params);
      if (origin === 'received') getChatListOrDetail();
    };

    switch (type) {
      case 'new_message':
        handleNewMessage();
        break;
      case 'start_appointment':
        navigate('DashboardScreen', params);
        break;
      case 'end_appointment':
        navigate('DashboardScreen', params);
        break;
      default:
        break;
    }
  });

  useEffect(() => {
    const onMount = async () => {
      showedAlert.current = false;

      if (!store.user.token) {
        const local = await storage.retrieveUser() || {};

        dispatch(updateUserState({ ...local, storageReady: true }));
      }


      apiInstance.interceptors.response.use((response) => response, (error) => {
        if (error.response.status === 401) {
          dispatch(logoutUser());

          navigate('OnboardingScreen');

          if (!showedAlert.current) {
            Alert.alert('Session ended', 'You have been logged out.\n\nTo log back login, please use the link below the registration button.');
            showedAlert.current = true;
          }
        }

        return Promise.reject(error);
      });
    };

    onMount();
  }, [store.user.token]);

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
