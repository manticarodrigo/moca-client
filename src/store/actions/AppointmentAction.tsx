/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Dispatch } from 'react';
import { subHours } from 'date-fns';

import api from '@src/services/api';

import { Appointment } from '@src/store/reducers/AppointmentReducer';

export type AppointmentAction =
  | { type: 'ANSWER_APPOINTMENT_REQUEST_SUCCESS' }
  | { type: 'GET_UPCOMING_APPOINTMENTS_SUCCESS'; payload: Appointment[] }
  | { type: 'GET_LAST_APPOINTMENT_SUCCESS'; payload: Appointment[] }
  | { type: 'GET_PAST_APPOINTMENTS_SUCCESS'; payload: Appointment[] }
  | { type: 'UPDATE_APPOINTMENT_SUCCESS'; payload: Appointment }

const answerAppointmentRequest = (id: string, status: 'accept' | 'reject' | 'cancel') => async (
  dispatch: Dispatch<AppointmentAction>,
  store,
) => {
  const options = { headers: { Authorization: `Token ${store.user.token}` } };

  await api.appointment.appointmentRequestCreate(id, status, options);

  dispatch({ type: 'ANSWER_APPOINTMENT_REQUEST_SUCCESS' });
};

const getUpcomingAppointments = () => async (
  dispatch: Dispatch<AppointmentAction>,
  store,
) => {
  const query = { start: subHours(new Date(), 1).toISOString(), limit: 3 };
  const options = { headers: { Authorization: `Token ${store.user.token}` }, query };

  const { data } = await api.appointment.appointmentList(options);

  // @ts-ignore
  const { patient, therapist, ...rest } = data; // therapist/patient come back as ids so remove them

  // @ts-ignore
  dispatch({ type: 'GET_UPCOMING_APPOINTMENTS_SUCCESS', payload: rest });
};

const getLastAppointment = () => async (
  dispatch: Dispatch<AppointmentAction>,
  store,
) => {
  const query = { end: new Date().toISOString(), limit: -1 };
  const options = { headers: { Authorization: `Token ${store.user.token}` }, query };

  const { data } = await api.appointment.appointmentList(options);

  // @ts-ignore
  dispatch({ type: 'GET_LAST_APPOINTMENT_SUCCESS', payload: data });
};

const getPastAppointments = () => async (
  dispatch: Dispatch<AppointmentAction>,
  store,
) => {
  const query = { end: new Date().toISOString() };
  const options = { headers: { Authorization: `Token ${store.user.token}` }, query };

  const { data } = await api.appointment.appointmentList(options);

  // @ts-ignore
  dispatch({ type: 'GET_PAST_APPOINTMENTS_SUCCESS', payload: data });
};

const updateAppointment = (
  appointmentId: string,
  body: Pick<Appointment, 'review' | 'note'>,
) => async (
  dispatch: Dispatch<AppointmentAction>,
  store,
) => {
  const options = { headers: { Authorization: `Token ${store.user.token}` } };

  // @ts-ignore
  const { data } = await api.appointment.appointmentPartialUpdate(appointmentId, body, options);

  dispatch({ type: 'UPDATE_APPOINTMENT_SUCCESS', payload: data });
};

export {
  answerAppointmentRequest,
  getUpcomingAppointments,
  getLastAppointment,
  getPastAppointments,
  updateAppointment,
};
