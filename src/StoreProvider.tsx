import React, { useReducer, createContext, Reducer, Dispatch } from 'react';

import { UserAction } from '@src/store/actions/UserAction';
import { RegistrationAction } from '@src/store/actions/RegistrationAction';
import { ConversationAction } from '@src/store/actions/ConversationAction';

import userReducer, { UserState } from '@src/store/reducers/UserReducer';
import registrationReducer, { RegistrationState } from '@src/store/reducers/RegistrationReducer';
import conversationReducer, { ConversationState } from '@src/store/reducers/ConversationReducer';

export type StoreState = {
  user: UserState;
  conversations: ConversationState;
  registration: RegistrationState;
};

type StoreAction = UserAction | ConversationAction| RegistrationAction;
type StoreReducer = Reducer<StoreState, StoreAction>;

type ProviderAsyncAction = (
  dispatch: Dispatch<StoreAction>,
  store: StoreState,
) => Promise<object | void>;

export type ProviderDispatch = (
  action: StoreAction | ProviderAsyncAction,
) => void | Promise<object | void>;

type ProviderValue = [StoreState, ProviderDispatch];

type AsyncReducer = (
  reducer: StoreReducer,
  initialState: StoreState,
) => [StoreState, (action: StoreAction) => void];

const useAsyncReducer: AsyncReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const asyncDispatch = async (action) => typeof action === 'function'
    ? action(asyncDispatch, state)
    : dispatch(action);

  return [state, asyncDispatch];
};

const rootReducer: StoreReducer = (store: StoreState, action: StoreAction) => ({
  user: userReducer(store.user, action as UserAction),
  registration: registrationReducer(store.registration, action as RegistrationAction),
  conversations: conversationReducer(store.conversations, action as ConversationAction),
});

const initialState: StoreState = {
  user: {},
  conversations: [],
  registration: {},
};

export const StoreContext = createContext<ProviderValue>([initialState, () => null]);

const StoreProvider = ({ children }: { children: JSX.Element[] }) => (
  <StoreContext.Provider value={useAsyncReducer(rootReducer, initialState)}>
    {children}
  </StoreContext.Provider>
);

export default StoreProvider;
