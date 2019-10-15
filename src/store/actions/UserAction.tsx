import { Dispatch } from 'react';

import api from '@src/services/api';
import { Patient, PatientCreate } from '@src/services/openapi';
import { UserState } from '@src/store/reducers/UserReducer';

export type UserAction =
  | { type: 'SET_USER'; payload: UserState }
  | { type: 'UPDATE_USER'; payload: UserState }
  | { type: 'REGISTER_PATIENT_SUCCESS'; payload: Patient }

const setUser = (state: UserState) => (async (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: 'SET_USER', payload: state });
});

const updateUser = (partialState: UserState) => (async (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: 'UPDATE_USER', payload: partialState });
});

const registerPatient = (form: PatientCreate) => async (
  dispatch: Dispatch<UserAction>) => {
  const { email, password, firstName, lastName } = form.user;
  const { data } = await api.user.userPatientCreate({
    user: {
      email,
      password,
      firstName,
      lastName,
    },
  });
  dispatch({ type: 'REGISTER_PATIENT_SUCCESS', payload: data });
};

export {
  setUser,
  updateUser,
  registerPatient,
};
