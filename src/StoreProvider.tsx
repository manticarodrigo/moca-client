import React, { useReducer, createContext, Reducer, ReactNode, Dispatch } from 'react';

import { UserAction } from '@src/store/actions/UserAction';
import { RegistrationAction } from '@src/store/actions/RegistrationAction';
import { ConversationAction } from '@src/store/actions/ConversationAction';

import registrationReducer, { RegistrationState } from '@src/store/reducers/RegistrationReducer';
import userReducer, { UserState } from '@src/store/reducers/UserReducer';
import conversationReducer, { ConversationState } from '@src/store/reducers/ConversationReducer';

import { mockImg } from '@src/services/mock';
import { certificate1 } from '@src/utlities/images';

export type StoreState = {
  user: UserState;
  conversations: ConversationState;
  registrationState: RegistrationState;
};

type StoreAction = UserAction | ConversationAction| RegistrationAction;
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

const rootReducer: StoreReducer = (store: StoreState, action: StoreAction) => ({
  user: userReducer(store.user, action as UserAction),
  registrationState: registrationReducer(store.registrationState, action as RegistrationAction),
  conversations: conversationReducer(store.conversations, action as ConversationAction),
});

const initialState: StoreState = {
  user: {
    id: '0',
    username: 'John Doe',
    imageUrl: mockImg,
    type: 'patient',
    certifications: [
      { id: '1', description: 'American Board of Internal Medicine', attachmentURI: certificate1 },
      { id: '2', description: 'USMLE Certified', attachmentURI: certificate1 },
      { id: '3', description: 'ACLS Certified', attachmentURI: certificate1 },
    ],
    rating: 0,
    reviewsNumber: '0',
    licenseNumber: '1234123',
    qualifications: [
      { name: 'Neck', value: 1 },
      { name: 'Shoulder', value: 0 },
      { name: 'Elbow', value: 1 },
      { name: 'Low Back', value: 0 },
      { name: 'Knee', value: 1 },
      { name: 'Ankle/Foot', value: 1 },
      { name: 'Other', value: 0 },
    ],
  },
  conversations: [],
  registrationState: {
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
};

export const StoreContext = createContext<ProviderValue>([initialState, () => null]);

const StoreProvider = ({ children }: { children: ReactNode }) => (
  <StoreContext.Provider value={useAsyncReducer(rootReducer, initialState)}>
    {children}
  </StoreContext.Provider>
);

export default StoreProvider;
