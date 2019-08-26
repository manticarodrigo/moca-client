import React, { useReducer, createContext, Reducer, ReactNode, Dispatch } from 'react';

import { AuthAction } from '@src/store/actions/AuthActions';
import { ChatAction } from '@src/store/actions/ChatActions';
import authReducer, { AuthState } from '@src/store/reducers/AuthReducer';
import chatReducer, { ChatState } from '@src/store/reducers/ChatReducer';

import { mockImg } from './services/mock';

export type StoreState = {
  authState: AuthState;
  chatState: ChatState;
};

type StoreAction = AuthAction | ChatAction;
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
  chatState: chatReducer(state.chatState, action as ChatAction),
});

const initialState: StoreState = {
  authState: {
    currentUser: {
      id: '0',
      username: 'John Doe',
      imageUrl: mockImg,
    },
  },
  chatState: {
    chats: [],
  },
};

export const StoreContext = createContext<ProviderValue>([initialState, () => undefined]);

const StoreProvider = ({ children }: { children: ReactNode }) => (
  <StoreContext.Provider value={useAsyncReducer(rootReducer, initialState)}>
    {children}
  </StoreContext.Provider>
);

export default StoreProvider;
