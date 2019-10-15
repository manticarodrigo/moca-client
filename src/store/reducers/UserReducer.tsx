import { UserAction } from '@src/store/actions/UserAction';

import { User, Patient, Therapist } from '@src/services/openapi';

export type UserState = Omit<User, 'email'> & Omit<Patient, 'user'> & Omit<Therapist, 'user'> & {
  email?: string;
};

const reducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, ...action.payload };
    case 'UPDATE_USER':
      return { ...state, ...action.payload };
    case 'REGISTER_PATIENT_SUCCESS':
      return { ...action.payload };
    default:
      return state;
  }
};

export default reducer;
