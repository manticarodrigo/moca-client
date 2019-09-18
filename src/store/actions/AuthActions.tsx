import { Dispatch } from 'react';

export type AuthAction =
  | { type: 'LOGIN'; payload: User };

const login = (username: string, password: string) => (async (dispatch: Dispatch<AuthAction>) => {
  // const user = await getUser(username, password);

  // dispatch({ type: 'LOGIN', payload: user });
});

export {
  login,
};
