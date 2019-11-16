import storage from '@src/services/storage';

import api from '@src/services/api';

import { UserAction } from '@src/store/actions/UserAction';
import { Address } from '@src/store/reducers/ConversationReducer';

import {
  User,
  Patient,
  Therapist,
  Payment as BadPayment,
  Price as BadPrice,
  UserSnippet,
  ProfileInfo,
} from '@src/services/openapi';
import { BrandType } from '@src/services/stripe';

export type Card = {
  brand: BrandType;
  expMonth: string;
  expYear: string;
  last4: string;
}

export type BankAccount = {
  accountHolderName: string;
  bankName: string;
  last4: string;
  routingNumber: string;
}

export type Payment = Omit<BadPayment, 'type' | 'paymentInfo'> & {
  type: 'card' | 'bank_account';
  paymentInfo: Card & BankAccount;
}

export type Price = Omit<BadPrice, 'sessionType'> & {
  id?: number;
  sessionType: 'thirty' | 'fourtyfive' | 'sixty' | 'evaluation';
}

export type Review = {
  id: number;
  rating: number;
  comment: string;
}

export type UserState = &
  ProfileInfo &
  UserSnippet &
  Omit<User, 'type' | 'email' | 'gender' | 'payments' | 'addresses'> &
  Omit<Patient, 'user'> &
  Omit<Therapist, 'user' | 'status' | 'prices'> & {
  token?: string;
  email?: string;
  type?: 'PT' | 'PA';
  status?: 'A' | 'B';
  gender?: 'M' | 'F';
  addresses?: Address[];
  prices?: Price[];
  payments?: Payment[];
  storageReady?: boolean;
}

function setPrimaryAddress(key: keyof UserState, state, payload) {
  if (key === 'addresses' && payload.primary) {
    state[key].forEach((address) => {
      address.primary = false;
    });
  }
}

function appendItem(key: keyof UserState, state, payload) {
  setPrimaryAddress(key, state, payload);

  return { ...state, [key]: [...state[key], payload] };
}

function updateItem(key: keyof UserState, state, payload) {
  const index = state[key].findIndex((val) => val.id === payload.id);

  if (index === -1) {
    return state;
  }

  setPrimaryAddress(key, state, payload);

  state[key][index] = payload;

  return { ...state };
}

function deleteItem(key: keyof UserState, state, payload: number) {
  state[key] = state[key].filter((val) => val.id !== payload);

  return { ...state };
}

const reducer = (state: UserState, action: UserAction): UserState => {
  let newState = state;

  switch (action.type) {
    case 'UPDATE_LOCAL_USER_STATE':
    case 'LOGIN_USER_SUCCESS':
    case 'FETCH_USER_SUCCESS':
    case 'UPDATE_USER_SUCCESS':
    case 'REGISTER_USER_SUCCESS':
      newState = { ...state, ...action.payload };
      break;
    case 'ADD_ADDRESS_SUCCESS':
      newState = appendItem('addresses', state, action.payload);
      break;
    case 'UPDATE_ADDRESS_SUCCESS':
      newState = updateItem('addresses', state, action.payload);
      break;
    case 'DELETE_ADDRESS_SUCCESS':
      newState = deleteItem('addresses', state, action.payload);
      break;
    case 'ADD_PRICE_SUCCESS':
      newState = appendItem('prices', state, action.payload);
      break;
    case 'UPDATE_PRICE_SUCCESS':
      newState = updateItem('prices', state, action.payload);
      break;
    case 'ADD_PAYMENT_SUCCESS':
      newState = appendItem('payments', state, action.payload);
      break;
    case 'ADD_LEAVE_PERIOD_SUCCESS':
      newState = appendItem('awayDays', state, action.payload);
      break;
    case 'UPDATE_LEAVE_PERIOD_SUCCESS':
      newState = updateItem('awayDays', state, action.payload);
      break;
    case 'DELETE_LEAVE_PERIOD_SUCCESS':
      newState = deleteItem('awayDays', state, action.payload);
      break;
    case 'ADD_INJURY_SUCCESS':
      newState = appendItem('injuries', state, action.payload);
      break;
    case 'UPDATE_INJURY_SUCCESS':
      newState = updateItem('injuries', state, action.payload);
      break;
    case 'DELETE_INJURY_SUCCESS':
      newState = deleteItem('injuries', state, action.payload);
      break;
    default:
      break;
  }

  if (action.type === 'LOGOUT_USER') {
    storage.storeUser('');
  } else {
    storage.storeUser(newState);
  }

  api.instance.defaults.headers.common.Authorization = newState.token && `Token ${newState.token}`;

  return newState;
};

export default reducer;
