import { UserAction } from '@src/store/actions/UserActions';

export type UserState = User;

const reducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
