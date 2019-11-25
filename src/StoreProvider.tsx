import React, { useReducer, createContext, Reducer, Dispatch } from 'react';

import { UserAction } from '@src/store/actions/UserAction';
import { RegistrationAction } from '@src/store/actions/RegistrationAction';
import { SearchAction } from '@src/store/actions/SearchAction';
import { ConversationAction } from '@src/store/actions/ConversationAction';
import { AppointmentAction } from '@src/store/actions/AppointmentAction';

import userReducer, { UserState } from '@src/store/reducers/UserReducer';
import registrationReducer, { RegistrationState } from '@src/store/reducers/RegistrationReducer';
import searchReducer, { SearchState } from '@src/store/reducers/SearchReducer';
import conversationReducer, { ConversationState } from '@src/store/reducers/ConversationReducer';
import appointmentReducer, { AppointmentState } from '@src/store/reducers/AppointmentReducer';

export type StoreState = {
  user: UserState;
  registration: RegistrationState;
  search: SearchState;
  conversations: ConversationState;
  appointments: AppointmentState;
};

type StoreAction =
  | UserAction
  | RegistrationAction
  | SearchAction
  | ConversationAction
  | AppointmentAction

type StoreReducer = Reducer<StoreState, StoreAction>

type ProviderAsyncAction = (
  dispatch: Dispatch<StoreAction>,
  store: StoreState,
) => Promise<object | void>

export type ProviderDispatch = (
action: StoreAction | ProviderAsyncAction,
) => void | Promise<object | void>

type ProviderValue = [StoreState, ProviderDispatch]

type AsyncReducer = (
  reducer: StoreReducer,
  initialState: StoreState,
) => [StoreState, (action: StoreAction) => void | Promise<object | void>];

const useAsyncReducer: AsyncReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const asyncDispatch = async (action) => typeof action === 'function'
    ? action(asyncDispatch, state)
    : dispatch(action);

  return [state, asyncDispatch];
};

export const initialState: StoreState = {
  user: {
    firstName: '',
    lastName: '',
    gender: 'M',
    type: 'PA',
    addresses: [],
    payments: [],
    prices: [],
    certifications: [],
    preferredAilments: [],
    awayDays: [],
    injuries: [],
  },
  registration: {
    address: {},
  },
  search: [],
  conversations: {
    list: [],
    map: {},
  },
  appointments: {
    upcoming: [],
    last: undefined,
    finished: [],
    future: [],
    past: [],
  },
};

const rootReducer: StoreReducer = (store: StoreState, action: StoreAction) => {
  const newState = {
    user: userReducer(store.user, action as UserAction),
    registration: registrationReducer(store.registration, action as RegistrationAction),
    search: searchReducer(store.search, action as SearchAction),
    conversations: conversationReducer(store.conversations, action as ConversationAction),
    appointments: appointmentReducer(store.appointments, action as AppointmentAction),
  };

  // console.log(action.type);

  if (action.type === 'LOGOUT_USER') {
    return { ...initialState, user: { ...initialState.user, storageReady: true } };
  }

  return newState;
};

export const StoreContext = createContext<ProviderValue>([initialState, () => null]);

const StoreProvider = ({ children }: { children: JSX.Element }) => (
  <StoreContext.Provider value={useAsyncReducer(rootReducer, initialState)}>
    {children}
  </StoreContext.Provider>
);

export default StoreProvider;
