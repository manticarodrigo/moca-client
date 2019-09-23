import { Dispatch } from 'react';

import { mockImg } from '@src/services/mock';

export type UserAction = | { type: 'SET_CURRENT_USER'; payload: User };

const getUser = (): User => ({
  id: '0',
  username: 'John Doe',
  imageUrl: mockImg,
});

const login = () => (async (dispatch: Dispatch<UserAction>) => {
  const user = await getUser();

  dispatch({ type: 'SET_CURRENT_USER', payload: user });
});

export {
  login,
};
