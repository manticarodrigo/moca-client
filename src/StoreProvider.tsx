import React, { useReducer, createContext, Reducer, ReactNode, Dispatch } from 'react';

import { AuthAction } from '@src/store/actions/AuthActions';
import { ChatAction } from '@src/store/actions/ChatActions';
import { RegistrationAction } from '@src/store/actions/RegistrationAction';
import authReducer, { AuthState } from '@src/store/reducers/AuthReducer';
import chatReducer, { ChatState } from '@src/store/reducers/ChatReducer';
import registrationReducer, { RegistrationState } from '@src/store/reducers/RegistrationReducer';
import { mockImg } from './services/mock';

export type StoreState = {
  authState: AuthState;
  chatState: ChatState;
  registrationState: RegistrationState;
};

type StoreAction = AuthAction | ChatAction | RegistrationAction;
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
  registrationState: registrationReducer(state.registrationState, action as RegistrationAction),
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
