import { AuthenticateApiFactory, UserApiFactory, AddressApiFactory } from '@src/services/openapi';

export default {
  auth: AuthenticateApiFactory(),
  user: UserApiFactory(),
  address: AddressApiFactory(),
};
