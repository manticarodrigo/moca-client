/* eslint-disable @typescript-eslint/camelcase */
import { useRef, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Notifications } from 'expo';

import api from '@src/services/api';

import storage from '@src/services/storage';
import { IS_IOS } from '@src/utlities/constants';

import useStore from '@src/hooks/useStore';
import useDebounce from '@src/hooks/useDebounce';

import { updateUserState, logoutUser } from '@src/store/actions/UserAction';
import { getConversations, getConversation } from '@src/store/actions/ConversationAction';
import {
  getUpcomingAppointments,
  getFinishedAppointments,
  getPastAppointments,
} from '@src/store/actions/AppointmentAction';

const showVerifyEmailAlert = () => Alert.alert(
  'Verify Email',
  'Please check your inbox for a link to verify ownership of your email address.',
);

const showLogoutAlert = () => Alert.alert(
  'Session ended',
  'To log back login, please use the link below the registration button.',
);

const AppStateHandler = ({ navigatorRef, children }) => {
  const { store, dispatch } = useStore();
  const [pushQueue, setPushQueue] = useState([]);
  const debouncedPushQueue = useDebounce(pushQueue, 500);

  const throttling401s = useRef(false);

  const navigator = navigatorRef.current;

  const navigate = (routeName, params = undefined) => navigator && navigator.dispatch(
    NavigationActions.navigate({ routeName, params }),
  );

  const onAPIError = async (error) => {
    if (error.response.status === 401 && !throttling401s.current) {
      throttling401s.current = true;

      dispatch(logoutUser(true));

      navigatorRef.current.dispatch(
        NavigationActions.navigate({ routeName: 'OnboardingScreen' }),
      );

      showLogoutAlert();

      setTimeout(() => {
        throttling401s.current = false;
      }, 2000);
    }

    return Promise.reject(error);
  };

  useEffect(() => {
    const onMount = async () => {
      if (!store.user.token) {
        const local = await storage.retrieveUser() || {};

        dispatch(updateUserState({ ...local, storageReady: true }));
      }

      api.instance.interceptors.response.use((response) => response, onAPIError.bind(this));
    };

    onMount();
  }, []);

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
      if (!store.user.id || !store.user.token) return undefined;
      if (!store.user.isActive) return showVerifyEmailAlert();
      return onAuthNavigate();
    };

    setTimeout(checkAuth);
  }, [store.user.id, store.user.token, store.user.isActive, store.user.storageReady]);

  useEffect(() => {
    if (!IS_IOS) return;

    const unreadCountTotal = store.conversations.list.reduce(
      // @ts-ignore
      (acc, { unreadCount = 0 }) => acc + unreadCount,
      0,
    );

    Notifications.setBadgeNumberAsync(unreadCountTotal);
  }, [store.conversations.list]);

  useEffect(() => {
    Notifications.addListener((next) => setPushQueue((prev) => [...prev, next]));
  }, []);

  useEffect(() => {
    if (!navigator || debouncedPushQueue <= 0) return;

    setPushQueue([]);

    const { index, routes } = navigator.state.nav;
    const activeStack = routes[index];
    const activeTab = activeStack.routes[activeStack.index];

    let activeChatId;
    let activeScreenName;

    if (activeTab.index) {
      const activeScreen = activeTab.routes[activeTab.index];

      if (activeScreen.routeName === 'ConversationScreen') {
        const { params = {} } = activeScreen;
        activeChatId = params.user && params.user.id;
      }

      activeScreenName = activeScreen.name;
    }

    const uniqueNotifications = {
      email_verified: undefined,
      current_chat: undefined,
      other_chat: undefined,
      current_appointment: undefined,
      review_appointment: undefined,
      failed_payment: undefined,
    };

    debouncedPushQueue.forEach((notification = {}) => {
      const { type, params = {} } = notification.data;
      const pushParamUser = params.user || {};

      const isNotSelf = pushParamUser.id !== store.user.id;
      const isFromCurrentChat = activeChatId === pushParamUser.id && isNotSelf;

      switch (type) {
        case 'email_verified':
          if (!isNotSelf) uniqueNotifications.email_verified = notification;
          break;
        case 'new_message':
          if (isFromCurrentChat) uniqueNotifications.current_chat = notification;
          if (!isFromCurrentChat) uniqueNotifications.other_chat = notification;
          break;
        case 'upcoming_appointment':
        case 'start_appointment':
        case 'end_appointment':
          uniqueNotifications.current_appointment = notification;
          break;
        case 'review_appointment':
          uniqueNotifications.review_appointment = notification;
          break;
        case 'failed_payment':
          uniqueNotifications.failed_payment = notification;
          break;
        default:
          break;
      }
    });

    const routeNotification = ({ origin, data, remote }) => {
      if (!remote || !navigator) return;
      const { type, params = {} } = data;
      const pushParamUser = params.user || {};

      const isNotSelf = pushParamUser.id !== store.user.id;
      const isFromCurrentChat = activeChatId === pushParamUser.id && isNotSelf;

      const getChatListOrDetail = (selected: boolean) => {
        if (selected) {
          navigate('ConversationScreen', params);
        }

        if (isFromCurrentChat) {
          return dispatch(getConversation(activeChatId));
        }

        return dispatch(getConversations());
      };

      switch (type) {
        case 'email_verified':
          dispatch(updateUserState({ ...store.user, isActive: true }));
          break;
        case 'new_message':
          if (origin === 'selected') getChatListOrDetail(true);
          if (origin === 'received') getChatListOrDetail(false);
          break;
        case 'upcoming_appointment':
        case 'start_appointment':
        case 'end_appointment':
          if (activeScreenName === 'DashboardScreen') {
            dispatch(getUpcomingAppointments());
          } else {
            navigate('DashboardScreen', params);
          }
          break;
        case 'review_appointment':
        case 'failed_payment':
          if (activeScreenName === 'HistoryScreen') {
            dispatch(getFinishedAppointments());
            dispatch(getPastAppointments());
          } else {
            navigate('HistoryScreen', params);
          }
          break;
        default:
          break;
      }
    };

    Object.values(uniqueNotifications).forEach(
      (notification) => notification && routeNotification(notification),
    );
  }, [debouncedPushQueue]);

  return children;
};

export default AppStateHandler;
