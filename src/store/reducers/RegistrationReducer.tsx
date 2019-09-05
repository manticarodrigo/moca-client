import { RegistrationAction } from '@src/store/actions/RegistrationAction';


export type RegistrationState = {
  userInformation?: RegistrationInformation;
};

const reducer = (state: RegistrationState = {}, action: RegistrationAction) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        userInformation: {
          ...state.userInformation,
          ...action.payLoad,
        },
      };
    default:
      return state;
  }
};

export default reducer;
