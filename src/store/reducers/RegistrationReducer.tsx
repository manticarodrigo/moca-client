import { RegistrationAction } from '@src/store/actions/RegistrationAction';


export type RegistrationState = {
  userInfo?: RegistrationInfo;
};

const reducer = (state: RegistrationState = {}, action: RegistrationAction) => {
  switch (action.type) {
    case 'GET_REGISTRATION_INFO':
      return {
        userInfo: {
          ...state.userInfo,
          ...action.payLoad,
        },
      };
    default:
      return state;
  }
};

export default reducer;
