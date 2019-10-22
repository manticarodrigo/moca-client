/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Dispatch } from 'react';

import api from '@src/services/api';

import { Appointment } from '@src/store/reducers/AppointmentReducer';

export type AppointmentAction =
  | { type: 'GET_APPOINTMENTS_SUCCESS'; payload: Appointment[] }

const getAppointments = () => async (
  dispatch: Dispatch<AppointmentAction>,
  store,
) => {
  const options = { headers: { Authorization: `Token ${store.user.token}` } };
  const { data } = await api.appointment.appointmentList(options);

  // @ts-ignore
  dispatch({ type: 'GET_APPOINTMENTS_SUCCESS', payload: data });
};

export {
  getAppointments,
};