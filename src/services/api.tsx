import { AuthenticateApiFactory, UserApiFactory, AddressApiFactory } from '@src/services/openapi';

const basePath = 'http://18.188.88.172:8000/api';

export default {
  auth: AuthenticateApiFactory({}, basePath),
  user: UserApiFactory({}, basePath),
  address: AddressApiFactory({}, basePath),
};
