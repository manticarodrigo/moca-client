import { RegistrationAction } from '@src/store/actions/RegistrationAction';
import { AddAddressForm } from '@src/store/actions/UserAction';

import { User } from '@src/services/openapi';

export type RegistrationState = {
  type?: User['type'];
  address?: Partial<AddAddressForm>;
  licenseNumber?: string;
}

const reducer = (state: RegistrationState, action: RegistrationAction) => {
  switch (action.type) {
    case 'UPDATE_REGISTRATION_FIELDS':
      return { ...state, ...action.payload };
    case 'RESET_REGISTRATION_FIELDS':
      return {};
    default:
      return state;
  }
};

export default reducer;
