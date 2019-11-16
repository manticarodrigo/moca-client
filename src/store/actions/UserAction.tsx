import { Dispatch } from 'react';

import api from '@src/services/api';

import { getDeviceToken } from '@src/utlities/deviceToken';

import { StoreState } from '@src/StoreProvider';
import { UserState, Price } from '@src/store/reducers/UserReducer';

import { User, Address, Payment, Leave, Injury, UserImage } from '@src/services/openapi';

export type UserAction =
  | { type: 'LOGOUT_USER' }
  | { type: 'UPDATE_LOCAL_USER_STATE'; payload: Partial<UserState> }
  | { type: 'REGISTER_USER_SUCCESS'; payload: Partial<UserState> }
  | { type: 'LOGIN_USER_SUCCESS'; payload: Partial<UserState> }
  | { type: 'FETCH_USER_SUCCESS'; payload: Partial<UserState> }
  | { type: 'UPDATE_USER_SUCCESS'; payload: Partial<UserState> }
  | { type: 'UPDATE_USER_IMAGE_SUCCESS'; payload: UserImage }
  | { type: 'ADD_ADDRESS_SUCCESS'; payload: Address }
  | { type: 'UPDATE_ADDRESS_SUCCESS'; payload: Address }
  | { type: 'DELETE_ADDRESS_SUCCESS'; payload: Address['id'] }
  | { type: 'ADD_PRICE_SUCCESS'; payload: Price }
  | { type: 'UPDATE_PRICE_SUCCESS'; payload: Price }
  | { type: 'ADD_PAYMENT_SUCCESS'; payload: Payment }
  | { type: 'ADD_LEAVE_PERIOD_SUCCESS'; payload: Leave }
  | { type: 'UPDATE_LEAVE_PERIOD_SUCCESS'; payload: Leave }
  | { type: 'DELETE_LEAVE_PERIOD_SUCCESS'; payload: Leave['id'] }
  | { type: 'ADD_INJURY_SUCCESS'; payload: Injury }
  | { type: 'UPDATE_INJURY_SUCCESS'; payload: Injury }
  | { type: 'DELETE_INJURY_SUCCESS'; payload: Injury['id'] }

const logoutUser = () => async (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: 'LOGOUT_USER' });
};

const updateUserState = (state: Partial<UserState>) => async (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: 'UPDATE_LOCAL_USER_STATE', payload: state });
};

const registerUser = (user: User) => async (dispatch: Dispatch<UserAction>) => {
  const { email, password, firstName, lastName } = user;
  const deviceToken = await getDeviceToken();

  const registerMethod = user.type === 'PA'
    ? api.user.userPatientCreate
    : api.user.userTherapistCreate;

  const { data } = await registerMethod({
    user: { email, password, firstName, lastName },
    deviceToken,
  });

  // @ts-ignore
  dispatch({ type: 'REGISTER_USER_SUCCESS', payload: data });
};

const loginUser = (email: string, password: string) => async (dispatch: Dispatch<UserAction>) => {
  const deviceToken = await getDeviceToken();

  const { data } = await api.auth.authenticateLoginCreate({ email, password, deviceToken });

  dispatch({ type: 'LOGIN_USER_SUCCESS', payload: data });
};

const fetchUser = () => async (dispatch: Dispatch<UserAction>, store: StoreState) => {
  const method = store.user.type === 'PT'
    ? api.user.userTherapistRead_29
    : api.user.userPatientRead;

  const { data } = await method(store.user.id.toString());

  // @ts-ignore
  dispatch({ type: 'FETCH_USER_SUCCESS', payload: data });
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

const updateUserImage = (uri: string) => async (
  dispatch: Dispatch<UserAction>,
  store: StoreState,
) => {
  const name = `user-${store.user.id}-time-${new Date().getTime()}.jpg`;
  const file = { uri, type: 'image/jpg', name };

  const response = await api.user.userImageUpdate(store.user.id, file);

  dispatch({ type: 'UPDATE_USER_IMAGE_SUCCESS', payload: response.data });
};

export type AddAddressForm = Omit<Address, 'id' | 'location'> & {
  coordinates?: [number, number];
}

const addAddress = (
  { coordinates, ...address }: AddAddressForm,
) => async (dispatch: Dispatch<UserAction>) => {
  const body = { ...address, location: JSON.stringify({ type: 'Point', coordinates }) };

  const { data } = await api.address.addressCreate(body);

  dispatch({ type: 'ADD_ADDRESS_SUCCESS', payload: data });

  return data;
};

const updateAddress = (
  { coordinates, ...address }: AddAddressForm & { id: number },
) => async (dispatch: Dispatch<UserAction>) => {
  const body = { ...address, location: JSON.stringify({ type: 'Point', coordinates }) };

  const { data } = await api.address.addressPartialUpdate(address.id.toString(), body);

  dispatch({ type: 'UPDATE_ADDRESS_SUCCESS', payload: data });

  return data;
};

const deleteAddress = (addressId: Address['id']) => async (dispatch: Dispatch<UserAction>) => {
  const { data } = await api.address.addressDelete(addressId.toString());

  dispatch({ type: 'DELETE_ADDRESS_SUCCESS', payload: addressId });

  return data;
};

const addPrice = (
  sessionType: Price['sessionType'],
  price: number,
) => async (dispatch: Dispatch<UserAction>) => {
  // @ts-ignore
  const { data } = await api.user.userTherapistPricesCreate({ sessionType, price });

  dispatch({ type: 'ADD_PRICE_SUCCESS', payload: data });
};

const updatePrice = (id: Price['id'], price: Price) => async (dispatch: Dispatch<UserAction>) => {
  // @ts-ignore
  const { data } = await api.user.userTherapistPricesUpdate(id.toString(), price);

  dispatch({ type: 'UPDATE_PRICE_SUCCESS', payload: data });
};

const addPayment = (info: Payment) => async (dispatch: Dispatch<UserAction>) => {
  const { data } = await api.payment.paymentCreate(info);

  dispatch({ type: 'ADD_PAYMENT_SUCCESS', payload: data });
};

const addLeavePeriod = (
  startDate: string,
  endDate: string,
) => async (dispatch: Dispatch<UserAction>) => {
  // @ts-ignore
  const { data } = await api.user.userTherapistAwayCreate({ startDate, endDate });

  dispatch({ type: 'ADD_LEAVE_PERIOD_SUCCESS', payload: data });
};

const updateLeavePeriod = (
  leaveId: Leave['id'],
  leave: Leave,
) => async (dispatch: Dispatch<UserAction>) => {
  const { data } = await api.user.userTherapistAwayPartialUpdate(leaveId.toString(), leave);

  dispatch({ type: 'UPDATE_LEAVE_PERIOD_SUCCESS', payload: data });
};

const deleteLeavePeriod = (leaveId: Leave['id']) => async (dispatch: Dispatch<UserAction>) => {
  await api.user.userTherapistAwayDelete(leaveId.toString());

  dispatch({ type: 'DELETE_LEAVE_PERIOD_SUCCESS', payload: leaveId });
};

const addInjury = (
  title: string,
  description: string,
  images?: string[],
) => async (dispatch: Dispatch<UserAction>, store: StoreState) => {
  // eslint-disable-next-line no-undef
  const data = new FormData();

  data.append('title', title);
  data.append('description', description);

  images.forEach((uri) => {
    const name = `user-${store.user.id}-injury-${title}-time-${new Date().getTime()}.jpg`;
    const file = { uri, type: 'image/jpg', name };
    // @ts-ignore
    data.append('images', file);
  });

  const response = await api.instance.request({
    method: 'post',
    url: `${api.basePath}/user/patient/injury/`,
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  dispatch({ type: 'ADD_INJURY_SUCCESS', payload: response.data });
};

const updateInjury = (
  injuryId: Injury['id'],
  title: string,
  description: string,
  images?: File[],
) => async (dispatch: Dispatch<UserAction>, store: StoreState) => {
  // eslint-disable-next-line no-undef
  const data = new FormData();

  data.append('title', title);
  data.append('description', description);

  images.forEach((uri) => {
    const name = `user-${store.user.id}-injury-${title}-time-${new Date().getTime()}.jpg`;
    const file = { uri, type: 'image/jpg', name };
    // @ts-ignore
    data.append('images', file);
  });

  const response = await api.instance.request({
    method: 'patch',
    url: `${api.basePath}/user/patient/injury/${injuryId}/`,
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  dispatch({ type: 'UPDATE_INJURY_SUCCESS', payload: response.data });
};

const deleteInjury = (injuryId: Injury['id']) => async (dispatch: Dispatch<UserAction>) => {
  await api.user.userPatientInjuryDelete(injuryId.toString());

  dispatch({ type: 'DELETE_INJURY_SUCCESS', payload: injuryId });
};

export {
  logoutUser,
  updateUserState,
  registerUser,
  loginUser,
  fetchUser,
  updateUser,
  updateUserImage,
  addAddress,
  updateAddress,
  deleteAddress,
  addPrice,
  updatePrice,
  addPayment,
  addLeavePeriod,
  updateLeavePeriod,
  deleteLeavePeriod,
  addInjury,
  updateInjury,
  deleteInjury,
};
