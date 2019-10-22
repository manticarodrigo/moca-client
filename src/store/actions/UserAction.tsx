import { Dispatch } from 'react';

export type UserAction = |{type: 'UPDATE_USER'; payload: User}| { type: 'SET_USER'; payload: User };

const setUser = (user: User) => (async (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: 'SET_USER', payload: user });
});

const updateUser = (user: User) => (async (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: 'UPDATE_USER', payload: user });
});

export {
  setUser,
  updateUser,
};
