import axios from 'axios';

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
const instance = axios.create();

export default {
  basePath,
  instance,
  auth: AuthenticateApiFactory({}, basePath, instance),
  user: UserApiFactory({}, basePath, instance),
  address: AddressApiFactory({}, basePath, instance),
  appointment: AppointmentApiFactory({}, basePath, instance),
  review: ReviewApiFactory({}, basePath, instance),
  device: DeviceApiFactory({}, basePath, instance),
  payment: PaymentApiFactory({}, basePath, instance),
  chat: ChatApiFactory({}, basePath, instance),
};
