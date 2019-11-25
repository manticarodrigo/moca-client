import { useRef, useEffect, useMemo } from 'react';
import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Notifications } from 'expo';

import api from '@src/services/api';

import storage from '@src/services/storage';
import { IS_IOS } from '@src/utlities/constants';

import useStore from '@src/hooks/useStore';
import { updateUserState, logoutUser } from '@src/store/actions/UserAction';
import { getConversations, getConversation } from '@src/store/actions/ConversationAction';
import { getUpcomingAppointments } from './store/actions/AppointmentAction';

const AppStateHandler = ({ navigatorRef, children }) => {
  const { store, dispatch } = useStore();
  const pushQueue = useRef([]);
  const showedAlert = useRef(false);
  const throttling401s = useRef(false);

  const navigator = navigatorRef.current;

  const isAuthenticated = useMemo(() => !!(store.user.id && store.user.token), [store.user]);

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

      Alert.alert(
        'Session ended',
        `You have been logged out.\n\n
        To log back login, please use the link below the registration button.
        `,
      );

      setTimeout(() => {
        throttling401s.current = false;
        showedAlert.current = true;
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
      if (!isAuthenticated) return;
      onAuthNavigate();
    };

    setTimeout(checkAuth);
  }, [isAuthenticated, store.user.storageReady]);


  useEffect(() => {
    if (!IS_IOS) return;

    const unreadCountTotal = store.conversations.list.reduce(
      // @ts-ignore
      (acc, { unreadCount = 0 }) => acc + unreadCount,
      0,
    );

    Notifications.setBadgeNumberAsync(unreadCountTotal);
  }, [store.conversations.list]);

  Notifications.addListener(({ origin, data, remote }) => {
    if (!remote) return;
    if (!navigator) return;

    const { type, params = {} } = data;

    const getChatListOrDetail = (selected: boolean) => {
      const tabState = navigator.state.nav.routes.find((stack) => stack.routeName === 'TabStack');
      const chatTabState = tabState.routes.find((tab) => tab.routeName === 'ConversationTab');
      const chatScreenState = chatTabState.routes.find((tab) => tab.routeName === 'ConversationScreen');

      const currentChatUser = ((chatScreenState || {}).params || {}).user || {};
      const pushParamUser = (params || {}).user || {};

      const isNotSelf = pushParamUser.id !== store.user.id;
      const isFromCurrentChat = currentChatUser.id === pushParamUser.id && isNotSelf;

      if (isFromCurrentChat) {
        if (selected) {
          navigate('ConversationScreen');
        }

        return dispatch(getConversation(currentChatUser.id));
      }

      if (!isFromCurrentChat && selected) {
        return navigate('ConversationScreen', params);
      }

      return dispatch(getConversations());
    };

    const routeNotification = () => {
      switch (type) {
        case 'new_message':
          if (origin === 'selected') getChatListOrDetail(true);
          if (origin === 'received') getChatListOrDetail(false);
          break;
        case 'current_appointment':
        case 'start_appointment':
        case 'end_appointment':
          dispatch(getUpcomingAppointments());
          navigate('DashboardScreen', params);
          break;
        default:
          break;
      }
    };

    pushQueue.current.push(data);

    if (pushQueue.current.length > 1) return;

    setTimeout(() => {
      if (pushQueue.current.length > 1) routeNotification();

      pushQueue.current = [];
    }, 1000);

    routeNotification();
  });

  return children;
};

export default AppStateHandler;
