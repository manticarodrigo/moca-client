/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Dispatch } from 'react';

import api from '@src/services/api';
import { StoreState } from '@src/StoreProvider';
import { UserState, Price } from '@src/store/reducers/UserReducer';

import { User, Address, Payment } from '@src/services/openapi';

export type UserAction =
  | { type: 'LOGOUT_USER' }
  | { type: 'UPDATE_LOCAL_USER_STATE'; payload: Partial<UserState> }
  | { type: 'REGISTER_USER_SUCCESS'; payload: Partial<UserState> }
  | { type: 'LOGIN_USER_SUCCESS'; payload: Partial<UserState> }
  | { type: 'UPDATE_USER_SUCCESS'; payload: Partial<UserState> }
  | { type: 'ADD_USER_ADDRESS_SUCCESS'; payload: Address }
  | { type: 'UPDATE_USER_ADDRESS_SUCCESS'; payload: Address }
  | { type: 'ADD_PRICE_SUCCESS'; payload: Price }
  | { type: 'ADD_PAYMENT_SUCCESS'; payload: Payment }

const logoutUser = () => async (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: 'LOGOUT_USER' });
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

  // @ts-ignore
  dispatch({ type: 'REGISTER_USER_SUCCESS', payload: data });

  return data;
};

const loginUser = (email: string, password: string) => async (dispatch: Dispatch<UserAction>) => {
  const { data } = await api.auth.authenticateLoginCreate({ email, password });

  dispatch({ type: 'LOGIN_USER_SUCCESS', payload: data });
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

  // @ts-ignore
  const { data } = await updateMethod(store.user.id.toString(), body);

  dispatch({ type: 'UPDATE_USER_SUCCESS', payload: data as UserState });

  return data;
};

export type AddAddressForm = Omit<Address, 'location'> & {
  coordinates?: [number, number];
}

const addUserAddress = (
  { coordinates, ...address }: AddAddressForm,
) => async (dispatch: Dispatch<UserAction>) => {
  const body = { ...address, location: JSON.stringify({ type: 'Point', coordinates }) };

  const { data } = await api.address.addressCreate(body);

  dispatch({ type: 'ADD_USER_ADDRESS_SUCCESS', payload: data });

  return data;
};

const updateUserAddress = (
  { coordinates, ...address }: AddAddressForm,
) => async (dispatch: Dispatch<UserAction>) => {
  const body = { ...address, location: JSON.stringify({ type: 'Point', coordinates }) };

  const { data } = await api.address.addressPartialUpdate(address.id.toString(), body);

  dispatch({ type: 'UPDATE_USER_ADDRESS_SUCCESS', payload: data });

  return data;
};

const addPrice = (
  sessionType: Price['sessionType'],
  price: number,
) => async (dispatch: Dispatch<UserAction>) => {
  const body = { sessionType, price };

  // @ts-ignore
  const { data } = await api.user.userTherapistPricesCreate(body);

  dispatch({ type: 'ADD_PRICE_SUCCESS', payload: data });
};

const addPayment = (info: Payment) => async (dispatch: Dispatch<UserAction>) => {
  const { data } = await api.payment.paymentCreate(info);

  dispatch({ type: 'ADD_PAYMENT_SUCCESS', payload: data });
};

const setAwayDates = (startDate: string, endDate: string) => async (
  dispatch: Dispatch<UserAction>,
  store: StoreState,
) => {
  // const body = { data: { startDate, endDate } };
  // to be added
};


export {
  logoutUser,
  updateUserState,
  registerUser,
  loginUser,
  updateUser,
  addUserAddress,
  updateUserAddress,
  addPrice,
  addPayment,
  setAwayDates,
};
