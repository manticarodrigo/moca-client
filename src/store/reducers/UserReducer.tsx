import { UserAction } from '@src/store/actions/UserAction';

import { User, Patient, Therapist, Address } from '@src/services/openapi';

type Tariff = {
  sessionType: 'evaluation' | 'thirty' | 'fortyfive' | 'sixty';
  price: number;
}

export type UserState = &
  Omit<User, 'email' | 'addresses'> &
  Omit<Patient, 'user'> &
  Omit<Therapist, 'user'> & {
  email?: string;
  token?: string;
  addresses?: Address[];
  tariffs?: Tariff[];
}

function flattenUserPayload(state, { user, ...rest }) {
  return { ...state, ...user, ...rest };
}

function appendAddress(state, payload) {
  return { ...state, addresses: [...state.addresses, payload] };
}

const reducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'UPDATE_LOCAL_USER_STATE':
      return { ...state, ...action.payload };
    case 'LOGIN_USER_SUCCESS':
    case 'UPDATE_USER_SUCCESS':
    case 'REGISTER_USER_SUCCESS':
      return flattenUserPayload(state, action.payload);
    case 'ADD_USER_ADDRESS_SUCCESS':
      return appendAddress(state, action.payload);
    // case 'ADD_PRICE_SUCCESS':
      // return flattenUserPayload(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
