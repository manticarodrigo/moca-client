import storage from '@src/services/storage';

import { UserAction } from '@src/store/actions/UserAction';

import { User, Patient, Therapist, Payment as BadPayment } from '@src/services/openapi';
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

export type Review = {
  id: number;
  rating: number;
  comment: string;
}

export type UserState = &
  Omit<User, 'type' | 'email' | 'gender' | 'payments'> &
  Omit<Patient, 'user'> &
  Omit<Therapist, 'user'> & {
  token?: string;
  email?: string;
  type?: 'PT' | 'PA';
  gender?: 'M' | 'F';
  payments?: Payment[];
  storageReady?: boolean;
}

function appendItem(key: keyof UserState, state, payload) {
  return { ...state, [key]: [...state[key], payload] };
}

function updateItem(key: keyof UserState, state, payload) {
  const index = state[key].findIndex((val) => val.id === payload.id);

  if (index === -1) {
    return state;
  }

  state[key][index] = payload;

  return state;
}

const reducer = (state: UserState, action: UserAction): UserState => {
  let newState = state;

  switch (action.type) {
    case 'UPDATE_LOCAL_USER_STATE':
    case 'LOGIN_USER_SUCCESS':
    case 'UPDATE_USER_SUCCESS':
    case 'REGISTER_USER_SUCCESS':
      newState = { ...state, ...action.payload };
      break;
    case 'ADD_USER_ADDRESS_SUCCESS':
      newState = appendItem('addresses', state, action.payload);
      break;
    case 'UPDATE_USER_ADDRESS_SUCCESS':
      newState = updateItem('addresses', state, action.payload);
      break;
    case 'ADD_PAYMENT_SUCCESS':
      newState = appendItem('payments', state, action.payload);
      break;
    case 'ADD_PRICE_SUCCESS':
      newState = appendItem('prices', state, action.payload);
      break;
    default:
      break;
  }

  if (action.type === 'LOGOUT_USER') {
    storage.storeUser('');
  } else {
    storage.storeUser(newState);
  }

  return newState;
};

export default reducer;
