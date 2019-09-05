import { Dispatch } from 'react';

export type RegistrationAction = { type: 'UPDATE_USER'; payLoad: RegistrationInformation };

export const updateUserInfomation = (information: RegistrationInformation) => (async (
  dispatch: Dispatch<RegistrationAction>) => {
  dispatch({ type: 'UPDATE_USER', payLoad: information });
});
