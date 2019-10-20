/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Dispatch } from 'react';

import api from '@src/services/api';
import storage from '@src/services/storage';
import { StoreState } from '@src/StoreProvider';
import { UserState } from '@src/store/reducers/UserReducer';

import {
  User,
  Address,
  Price,
} from '@src/services/openapi';

export type UserAction =
  | { type: 'LOGOUT_USER_SUCCESS' }
  | { type: 'UPDATE_LOCAL_USER_STATE'; payload: Partial<UserState> }
  | { type: 'REGISTER_USER_SUCCESS'; payload: Partial<UserState> }
  | { type: 'LOGIN_USER_SUCCESS'; payload: Partial<UserState> }
  | { type: 'UPDATE_USER_SUCCESS'; payload: Partial<UserState> }
  | { type: 'ADD_USER_ADDRESS_SUCCESS'; payload: Address }
  | { type: 'ADD_PRICE_SUCCESS'; payload: Price }

const logoutUser = () => async (dispatch: Dispatch<UserAction>) => {
  await storage.storeUser('');

  dispatch({ type: 'LOGOUT_USER_SUCCESS' });
};

const updateUserState = (state: Partial<UserState>) => async (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: 'UPDATE_LOCAL_USER_STATE', payload: state });
};


const registerUser = (user: User) => async (dispatch: Dispatch<UserAction>) => {
  const { email, password, firstName, lastName } = user;

  const registerMethod = user.type === 'PA'
    ? api.user.userPatientCreate
    : api.user.userTherapistCreate;

  const { data } = await registerMethod({ user: { email, password, firstName, lastName } });

  dispatch({ type: 'REGISTER_USER_SUCCESS', payload: data });

  await storage.storeUser(data);

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
  const user = { ...profileResponse.data, token: data.token };

  dispatch({ type: 'LOGIN_USER_SUCCESS', payload: user });

  await storage.storeUser(user);

  return user;
};


const updateUser = (partialState: UserState) => async (
  dispatch: Dispatch<UserAction>,
  store: StoreState,
) => {
  const { email, password, firstName, lastName, gender, ...rest } = partialState;

  let user;

  const hasUserUpdates = email || password || firstName || lastName || gender;

  if (hasUserUpdates) {
    user = {
      email: email || store.user.email,
      firstName: firstName || store.user.firstName,
      lastName: lastName || store.user.lastName,
      password: password || store.user.password,
      gender: gender || store.user.gender,
    };
  }

  const updateMethod = store.user.type === 'PA'
    ? api.user.userPatientPartialUpdate
    : api.user.userTherapistPartialUpdate;

  const body = { user, ...rest };
  const options = { headers: { Authorization: `Token ${store.user.token}` } };

  const { data } = await updateMethod(store.user.id.toString(), body, options);

  dispatch({ type: 'UPDATE_USER_SUCCESS', payload: data as UserState });

  await storage.storeUser({ ...data, token: store.user.token });

  return data;
};

export type AddAddressForm = Omit<Address, 'location'> & {
  coordinates?: [number, number];
}

const addUserAddress = ({ coordinates, ...address }: AddAddressForm) => async (
  dispatch: Dispatch<UserAction>,
  store: StoreState,
) => {
  const body = { ...address, location: JSON.stringify({ type: 'Point', coordinates }) };

  const options = { headers: { Authorization: `Token ${store.user.token}` } };

  const { data } = await api.address.addressCreate(body, options);

  dispatch({ type: 'ADD_USER_ADDRESS_SUCCESS', payload: data });

  return data;
};


const addPrice = (sessionType: string, price: string) => async (
  dispatch: Dispatch<UserAction>, store: StoreState,
) => {
  const options = { headers: { Authorization: `Token ${store.user.token}` } };
  const body = { sessionType, price: Number(price) };

  const { data } = await api.user.userTherapistTariffsCreate(
    store.user.id.toString(),
    body,
    options,
  );

  dispatch({ type: 'ADD_PRICE_SUCCESS', payload: data });
};

const setAwayDates = (startDate: string, endDate: string) => async (
  dispatch: Dispatch<UserAction>,
  store: StoreState,
) => {
  // const body = { data: { startDate, endDate } };
  // const options = { headers: { Authorization: `Token ${store.user.token}` } };
  // to be added
};


export {
  logoutUser,
  updateUserState,
  registerUser,
  loginUser,
  updateUser,
  addUserAddress,
  addPrice,
  setAwayDates,
};
