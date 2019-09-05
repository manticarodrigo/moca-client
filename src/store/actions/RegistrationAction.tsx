import { Dispatch } from 'react';

export type RegistrationAction = { type: 'GET_REGISTRATION_INFO'; payLoad: RegistrationInfo };

export const submitUserInfo = (info: RegistrationInfo) => (async (
  dispatch: Dispatch<RegistrationAction>) => {
  dispatch({ type: 'GET_REGISTRATION_INFO', payLoad: info });
});
