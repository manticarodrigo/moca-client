import { User } from '@src/types';
import { AuthAction } from '@src/store/actions/AuthActions';

export type AuthState = {
  user?: User;
};

const reducer = (state: AuthState = {}, action: AuthAction) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
