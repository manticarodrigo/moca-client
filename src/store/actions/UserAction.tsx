import { Dispatch } from 'react';

import api from '@src/services/api';
import { StoreState } from '@src/StoreProvider';
import { UserState } from '@src/store/reducers/UserReducer';
import { User, Patient, PatientCreate, Therapist, TherapistCreate } from '@src/services/openapi';

export type UserAction =
  | { type: 'SET_USER_STATE'; payload: UserState }
  | { type: 'REGISTER_USER_SUCCESS'; payload: PatientCreate | TherapistCreate }
  | { type: 'UPDATE_USER_SUCCESS'; payload: Patient | Therapist }

const setUser = (state: UserState) => (async (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: 'SET_USER_STATE', payload: state });
});

const registerUser = (user: User) => async (
  dispatch: Dispatch<UserAction>) => {
  const method = user.type === 'PA'
    ? api.user.userPatientCreate
    : api.user.userTherapistCreate;

  const { email, password, firstName, lastName } = user;

  const { data } = await method({
    user: { email, password, firstName, lastName },
  });

  dispatch({ type: 'REGISTER_USER_SUCCESS', payload: data });
};

const updateUser = (partialState: UserState) => async (
  dispatch: Dispatch<UserAction>,
  store: StoreState,
) => {
  const method = partialState.type === 'PA'
    ? api.user.userPatientPartialUpdate
    : api.user.userTherapistPartialUpdate;

  const { email, password, firstName, lastName, ...rest } = partialState;

  const body = { user: { email, password, firstName, lastName }, ...rest };
  const options = { headers: { Authorization: `Token ${store.user.token}` } };

  const { data } = await method(store.user.id.toString(), body, options);

  dispatch({ type: 'UPDATE_USER_SUCCESS', payload: data });
};

export {
  setUser,
  registerUser,
  updateUser,
};
