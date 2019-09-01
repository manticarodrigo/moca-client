import { AuthAction } from '@src/store/actions/AuthActions';

export type AuthState = {
  currentUser?: User;
};

const reducer = (state: AuthState = {}, action: AuthAction) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
