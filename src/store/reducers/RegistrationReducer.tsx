import { RegistrationAction } from '@src/store/actions/RegistrationAction';

import { User, Address } from '@src/services/openapi';

type RegisterAddress = Omit<Partial<Address>, 'location'> & {
  location?: { type: string; coordinates: [number, number] };
}

export type RegistrationState = {
  type?: User['type'];
  address?: RegisterAddress;
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
