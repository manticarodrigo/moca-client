import { Dispatch } from 'react';

import { User } from '@src/types';
import { mockImg } from '@src/services/mock';

export type AuthAction =
  | { type: 'LOGIN'; payload: User };

export const login = () => (async (dispatch: Dispatch<AuthAction>) => {
  const user: User = {
    id: '0',
    username: 'John Doe',
    imageUrl: mockImg,
  };

  dispatch({ type: 'LOGIN', payload: user });
});

export default {};
