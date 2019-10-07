import { Dispatch } from 'react';

export type UserAction = | { type: 'SET_USER'; payload: User };

const setUser = (user: User) => (async (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: 'SET_USER', payload: user });
});

export {
  setUser,
};
