import { Dispatch } from 'react';

export type RegistrationAction = { type: 'UPDATE_USER'; payLoad: RegistrationInformation } |
{ type: 'RESET_USER' };

export const updateUserInfomation = (information: RegistrationInformation) => (async (
  dispatch: Dispatch<RegistrationAction>) => {
  dispatch({ type: 'UPDATE_USER', payLoad: information });
});

export const resetUserInformation = () => (async (
  dispatch: Dispatch<RegistrationAction>) => {
  dispatch({ type: 'RESET_USER' });
});
