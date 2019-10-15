import { UserApiFactory, AddressApiFactory } from '@src/services/openapi';

export default {
  user: UserApiFactory(),
  address: AddressApiFactory(),
};
