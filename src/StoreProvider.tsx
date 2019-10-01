import React, { useReducer, createContext, Reducer, ReactNode, Dispatch } from 'react';

import { AuthAction } from '@src/store/actions/AuthActions';
import { RegistrationAction } from '@src/store/actions/RegistrationAction';
import { ConversationAction } from '@src/store/actions/ConversationActions';

import registrationReducer, { RegistrationState } from '@src/store/reducers/RegistrationReducer';
import authReducer, { AuthState } from '@src/store/reducers/AuthReducer';
import conversationReducer, { ConversationState } from '@src/store/reducers/ConversationReducer';

import { mockImg } from './services/mock';

export type StoreState = {
  authState: AuthState;
  conversationState: ConversationState;
  registrationState: RegistrationState;
};


type StoreAction = AuthAction | ConversationAction| RegistrationAction;
type StoreReducer = Reducer<StoreState, StoreAction>;

type ProviderAsyncAction = (dispatch: Dispatch<StoreAction>) => void;
export type ProviderDispatch = (action: StoreAction | ProviderAsyncAction) => void;
type ProviderValue = [StoreState, ProviderDispatch];

type AsyncReducer = (
  reducer: StoreReducer,
  initialState: StoreState,
) => [StoreState, (action: StoreAction) => void];

const useAsyncReducer: AsyncReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const asyncDispatch = async (action) => typeof action === 'function'
    ? action(asyncDispatch)
    : dispatch(action);

  return [state, asyncDispatch];
};

const rootReducer: StoreReducer = (state: StoreState, action: StoreAction) => ({
  authState: authReducer(state.authState, action as AuthAction),
  registrationState: registrationReducer(state.registrationState, action as RegistrationAction),
  conversationState: conversationReducer(state.conversationState, action as ConversationAction),
});

const initialState: StoreState = {
  authState: {
    currentUser: {
      id: '0',
      username: 'John Doe',
      imageUrl: mockImg,
    },
  },
  conversationState: {
    conversations: [],
  },
  registrationState: {
    userInformation: {
      qualifications: [
        { name: 'Neck', value: 0 },
        { name: 'Shoulder', value: 0 },
        { name: 'Elbow', value: 0 },
        { name: 'Low Back', value: 0 },
        { name: 'Knee', value: 0 },
        { name: 'Ankle/Foot', value: 0 },
        { name: 'Other', value: 0 },
      ],
      addresses: [],
    },
  },
};

export const StoreContext = createContext<ProviderValue>([initialState, () => null]);

const StoreProvider = ({ children }: { children: ReactNode }) => (
  <StoreContext.Provider value={useAsyncReducer(rootReducer, initialState)}>
    {children}
  </StoreContext.Provider>
);

export default StoreProvider;
