import React, { useReducer, createContext, Reducer, ReactNode, Dispatch } from 'react';

import { AuthAction } from '@src/store/actions/AuthActions';
import { ConversationAction } from '@src/store/actions/ConversationActions';
import authReducer, { AuthState } from '@src/store/reducers/AuthReducer';
import conversationReducer, { ConversationState } from '@src/store/reducers/ConversationReducer';

import { mockImg } from './services/mock';

export type StoreState = {
  authState: AuthState;
  conversationState: ConversationState;
};

type StoreAction = AuthAction | ConversationAction;
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
};

export const StoreContext = createContext<ProviderValue>([initialState, () => null]);

const StoreProvider = ({ children }: { children: ReactNode }) => (
  <StoreContext.Provider value={useAsyncReducer(rootReducer, initialState)}>
    {children}
  </StoreContext.Provider>
);

export default StoreProvider;
