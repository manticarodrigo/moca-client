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
    case 'RESET_USER':
      return {
        userInformation: {
          qualifications: [
            { name: 'Neck', value: 0 },
            { name: 'Shoulder', value: 0 },
            { name: 'Elbow', value: 0 },
            { name: 'Low Back', value: 0 },
            { name: 'Knee', value: 0 },
            { name: 'Ankle/Foot', value: 0 },
            { name: 'Other', value: 0 },
          ],
          addresses: [],
        },
      };
    default:
      return state;
  }
};

export default reducer;
