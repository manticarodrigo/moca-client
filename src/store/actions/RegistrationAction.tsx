import { Dispatch } from 'react';

import { RegistrationState } from '@src/store/reducers/RegistrationReducer';

export type RegistrationAction =
  | { type: 'UPDATE_REGISTRATION_FIELDS'; payload: Partial<RegistrationState> }
  | { type: 'RESET_REGISTRATION_FIELDS' };

export const updateRegistration = (partialState: RegistrationState) => async (
  dispatch: Dispatch<RegistrationAction>) => dispatch(
  { type: 'UPDATE_REGISTRATION_FIELDS', payload: partialState },
);

export const resetRegistration = () => async (
  dispatch: Dispatch<RegistrationAction>) => dispatch({ type: 'RESET_REGISTRATION_FIELDS' });
