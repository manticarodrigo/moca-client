/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Dispatch } from 'react';

import api from '@src/services/api';
import { StoreState } from '@src/StoreProvider';
import { UserState } from '@src/store/reducers/UserReducer';
import { getLocation } from '@src/services/location';

import {
  User,
  Patient,
  PatientCreate,
  Therapist,
  TherapistCreate,
  AddressCreate,
} from '@src/services/openapi';

export type UserAction =
  | { type: 'UPDATE_LOCAL_USER_STATE'; payload: Partial<UserState> }
  | { type: 'REGISTER_USER_SUCCESS'; payload: PatientCreate | TherapistCreate }
  | { type: 'LOGIN_USER_SUCCESS'; payload: Patient | Therapist }
  | { type: 'UPDATE_USER_SUCCESS'; payload: Patient | Therapist }
  | { type: 'ADD_USER_ADDRESS_SUCCESS'; payload: AddressCreate }


const updateUserState = (state: Partial<UserState>) => (async (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: 'UPDATE_LOCAL_USER_STATE', payload: state });
});


const registerUser = (user: User) => async (dispatch: Dispatch<UserAction>) => {
  const { email, password, firstName, lastName } = user;

  const registerMethod = user.type === 'PA'
    ? api.user.userPatientCreate
    : api.user.userTherapistCreate;

  const { data } = await registerMethod({ user: { email, password, firstName, lastName } });

  dispatch({ type: 'REGISTER_USER_SUCCESS', payload: data });

  return data;
};


const loginUser = (email: string, password: string) => async (dispatch: Dispatch<UserAction>) => {
  const { data } = await api.auth.authenticateLoginCreate({ email, password });

  // @ts-ignore
  const getProfileMethod = data.type === 'PA'
    ? api.user.userPatientRead
    : api.user.userTherapistRead_9;

  // @ts-ignore
  const options = { headers: { Authorization: `Token ${data.token}` } };
  // @ts-ignore
  const profileResponse = await getProfileMethod(data.id, options);

  // @ts-ignore
  const state = { ...profileResponse.data, token: data.token };

  dispatch({ type: 'LOGIN_USER_SUCCESS', payload: state });

  return state;
};


const updateUser = (partialState: UserState) => async (
  dispatch: Dispatch<UserAction>,
  store: StoreState,
) => {
  const { email, password, firstName, lastName, ...rest } = partialState;

  const hasUserUpdates = email || password || firstName || lastName;

  const user = {
    email: email || store.user.email,
    password: password || store.user.password,
    firstName: firstName || store.user.firstName,
    lastName: lastName || store.user.lastName,
  };

  const updateMethod = partialState.type === 'PA'
    ? api.user.userPatientPartialUpdate
    : api.user.userTherapistPartialUpdate;

  const body = { user: hasUserUpdates ? user : undefined, ...rest };
  const options = { headers: { Authorization: `Token ${store.user.token}` } };

  const { data } = await updateMethod(store.user.id.toString(), body, options);

  dispatch({ type: 'UPDATE_USER_SUCCESS', payload: data });

  return data;
};


const addUserAddress = (address: Omit<AddressCreate, 'location'>) => async (
  dispatch: Dispatch<UserAction>,
  store: StoreState,
) => {
  const body = { ...address, location: '' };
  const options = { headers: { Authorization: `Token ${store.user.token}` } };

  const location = await getLocation();

  if (location) {
    const { latitude, longitude } = location.coords;

    body.location = JSON.stringify({ type: 'Point', coordinates: [latitude, longitude] });
  }
  const { data } = await api.address.addressAddCreate(body, options);

  dispatch({ type: 'ADD_USER_ADDRESS_SUCCESS', payload: data });

  return data;
};


export {
  updateUserState,
  registerUser,
  loginUser,
  updateUser,
  addUserAddress,
};
