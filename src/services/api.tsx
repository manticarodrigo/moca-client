import {
  AuthenticateApiFactory,
  UserApiFactory,
  AddressApiFactory,
  AppointmentApiFactory,
  ReviewApiFactory,
  DeviceApiFactory,
  PaymentApiFactory,
  ChatApiFactory,
} from '@src/services/openapi';

const basePath = undefined; // 'http://18.188.88.172:8000/api';

export default {
  auth: AuthenticateApiFactory({}, basePath),
  user: UserApiFactory({}, basePath),
  address: AddressApiFactory({}, basePath),
  appointment: AppointmentApiFactory({}, basePath),
  review: ReviewApiFactory({}, basePath),
  device: DeviceApiFactory({}, basePath),
  payment: PaymentApiFactory({}, basePath),
  chat: ChatApiFactory({}, basePath),
};
