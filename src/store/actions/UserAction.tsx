import { Dispatch } from 'react';

import api from '@src/services/api';

import { getDeviceToken } from '@src/utlities/deviceToken';

import { StoreState } from '@src/StoreProvider';
import { UserState, Price } from '@src/store/reducers/UserReducer';

import {
  User,
  UserImage,
  Address, Payment,
  AwayPeriod,
  Certification,
  Injury,
} from '@src/services/openapi';

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
  | { type: 'ADD_PAYMENT_SUCCESS'; payload: Payment }
  | { type: 'ADD_PRICE_SUCCESS'; payload: Price }
  | { type: 'UPDATE_PRICE_SUCCESS'; payload: Price }
  | { type: 'ADD_AWAY_PERIOD_SUCCESS'; payload: AwayPeriod }
  | { type: 'UPDATE_AWAY_PERIOD_SUCCESS'; payload: AwayPeriod }
  | { type: 'DELETE_AWAY_PERIOD_SUCCESS'; payload: AwayPeriod['id'] }
  | { type: 'ADD_CERTIFICATION_SUCCESS'; payload: Certification }
  | { type: 'UPDATE_CERTIFICATION_SUCCESS'; payload: Certification }
  | { type: 'DELETE_CERTIFICATION_SUCCESS'; payload: Certification['id'] }
  | { type: 'ADD_INJURY_SUCCESS'; payload: Injury }
  | { type: 'UPDATE_INJURY_SUCCESS'; payload: Injury }
  | { type: 'DELETE_INJURY_SUCCESS'; payload: Injury['id'] }

const logoutUser = (isExpired?: boolean) => async (dispatch: Dispatch<UserAction>) => {
  if (!isExpired) {
    await api.auth.authenticateLogoutCreate();
  }

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
    ? api.user.userTherapistRead_28
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

const addPayment = (info: Payment) => async (dispatch: Dispatch<UserAction>) => {
  const { data } = await api.payment.paymentCreate(info);

  dispatch({ type: 'ADD_PAYMENT_SUCCESS', payload: data });
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

const addAwayPeriod = (
  startDate: string,
  endDate: string,
) => async (dispatch: Dispatch<UserAction>) => {
  // @ts-ignore
  const { data } = await api.user.userTherapistAwayCreate({ startDate, endDate });

  dispatch({ type: 'ADD_AWAY_PERIOD_SUCCESS', payload: data });
};

const updateAwayPeriod = (
  periodId: AwayPeriod['id'],
  { startDate, endDate },
) => async (dispatch: Dispatch<UserAction>) => {
  const { data } = await api.user.userTherapistAwayPartialUpdate(
    periodId.toString(),
    { startDate, endDate },
  );

  dispatch({ type: 'UPDATE_AWAY_PERIOD_SUCCESS', payload: data });
};

const deleteAwayPeriod = (periodId: AwayPeriod['id']) => async (dispatch: Dispatch<UserAction>) => {
  await api.user.userTherapistAwayDelete(periodId.toString());

  dispatch({ type: 'DELETE_AWAY_PERIOD_SUCCESS', payload: periodId });
};

const sendFormData = (
  method: 'post' | 'patch',
  userId: number,
  userType: 'therapist' | 'patient',
  type: 'injury' | 'certifications',
  { id = undefined, title, description, images = [] },
) => {
  // eslint-disable-next-line no-undef
  const data = new FormData();

  data.append('title', title);
  data.append('description', description);

  images.forEach((uri) => {
    const name = `user-${userId}-${type}-${title}-time-${new Date().getTime()}.jpg`;
    const file = { uri, type: 'image/jpg', name };
    // @ts-ignore
    data.append('images', file);
  });

  return api.instance.request({
    method,
    url: `${api.basePath}/user/${userType}/${type}/${id ? `${id}/` : ''}`,
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const addCertification = (
  title: string,
  description: string,
  images?: string[],
) => async (dispatch: Dispatch<UserAction>, store: StoreState) => {
  const data = { title, description, images };
  const response = await sendFormData('post', store.user.id, 'therapist', 'certifications', data);

  dispatch({ type: 'ADD_CERTIFICATION_SUCCESS', payload: response.data });
};

const updateCertification = (
  id: Injury['id'],
  title: string,
  description: string,
  images?: File[],
) => async (dispatch: Dispatch<UserAction>, store: StoreState) => {
  const data = { id, title, description, images };
  const response = await sendFormData('patch', store.user.id, 'therapist', 'certifications', data);

  dispatch({ type: 'UPDATE_CERTIFICATION_SUCCESS', payload: response.data });
};

const deleteCertification = (injuryId: Injury['id']) => async (dispatch: Dispatch<UserAction>) => {
  await api.user.userPatientInjuryDelete(injuryId.toString());

  dispatch({ type: 'DELETE_CERTIFICATION_SUCCESS', payload: injuryId });
};

const addInjury = (
  title: string,
  description: string,
  images?: string[],
) => async (dispatch: Dispatch<UserAction>, store: StoreState) => {
  const data = { title, description, images };
  const response = await sendFormData('post', store.user.id, 'patient', 'injury', data);

  dispatch({ type: 'ADD_INJURY_SUCCESS', payload: response.data });
};

const updateInjury = (
  id: Injury['id'],
  title: string,
  description: string,
  images?: File[],
) => async (dispatch: Dispatch<UserAction>, store: StoreState) => {
  const data = { id, title, description, images };
  const response = await sendFormData('patch', store.user.id, 'patient', 'injury', data);

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
  addAwayPeriod,
  updateAwayPeriod,
  deleteAwayPeriod,
  addCertification,
  updateCertification,
  deleteCertification,
  addInjury,
  updateInjury,
  deleteInjury,
};
