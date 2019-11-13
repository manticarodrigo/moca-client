import { Dispatch } from 'react';
import { subHours } from 'date-fns';

import api from '@src/services/api';

import { Appointment } from '@src/store/reducers/AppointmentReducer';
import { AppointmentCancellation } from '@src/services/openapi';

export type AppointmentAction =
  | { type: 'ANSWER_APPOINTMENT_REQUEST_SUCCESS' }
  | { type: 'GET_UPCOMING_APPOINTMENTS_SUCCESS'; payload: Appointment[] }
  | { type: 'GET_LAST_APPOINTMENT_SUCCESS'; payload: Appointment[] }
  | { type: 'GET_PAST_APPOINTMENTS_SUCCESS'; payload: Appointment[] }
  | { type: 'UPDATE_APPOINTMENT_SUCCESS'; payload: Appointment }
  | { type: 'CANCEL_APPOINTMENT_SUCCESS'; payload: Appointment['id'] }
  | { type: 'START_APPOINTMENT_SUCCESS'; payload: Appointment['id'] }
  | { type: 'END_APPOINTMENT_SUCCESS'; payload: Appointment['id'] }

type AppointmentDispatch = Dispatch<AppointmentAction>;

const answerAppointmentRequest = (
  id: string,
  status: 'accept' | 'reject' | 'cancel',
) => async (dispatch: Dispatch<AppointmentAction>) => {
  await api.appointment.appointmentRequestCreate(id, status);

  dispatch({ type: 'ANSWER_APPOINTMENT_REQUEST_SUCCESS' });
};

const getUpcomingAppointments = () => async (dispatch: AppointmentDispatch) => {
  const query = { start: subHours(new Date(), 1).toISOString(), limit: 3 };

  const { data } = await api.appointment.appointmentList({ query });

  // @ts-ignore
  dispatch({ type: 'GET_UPCOMING_APPOINTMENTS_SUCCESS', payload: data });
};

const getLastAppointment = () => async (dispatch: AppointmentDispatch) => {
  const query = { end: new Date().toISOString(), limit: -1 };
  const options = { query };

  const { data } = await api.appointment.appointmentList(options);

  // @ts-ignore
  dispatch({ type: 'GET_LAST_APPOINTMENT_SUCCESS', payload: data });
};

const getPastAppointments = () => async (dispatch: AppointmentDispatch) => {
  const query = { end: new Date().toISOString() };

  const { data } = await api.appointment.appointmentList({ query });

  // @ts-ignore
  dispatch({ type: 'GET_PAST_APPOINTMENTS_SUCCESS', payload: data });
};

const updateAppointment = (
  appointmentId: Appointment['id'],
  body: Pick<Appointment, 'review' | 'note'>,
) => async (dispatch: AppointmentDispatch) => {
  // @ts-ignore
  const { data } = await api.appointment.appointmentPartialUpdate(appointmentId.toString(), body);

  // therapist/patient come back as ids so remove them
  delete data.therapist;
  delete data.patient;

  dispatch({ type: 'UPDATE_APPOINTMENT_SUCCESS', payload: data });
};

const cancelAppointment = (
  appointmentId: Appointment['id'],
  type: AppointmentCancellation['type'],
) => async (dispatch: AppointmentDispatch) => {
  await api.appointment.appointmentCancelCreate(appointmentId.toString(), { type });

  dispatch({ type: 'CANCEL_APPOINTMENT_SUCCESS', payload: appointmentId });
};

const startAppointment = (id: Appointment['id']) => async (dispatch: AppointmentDispatch) => {
  await api.appointment.appointmentStartCreate(id.toString());

  dispatch({ type: 'START_APPOINTMENT_SUCCESS', payload: id });
};

const endAppointment = (id: Appointment['id']) => async (dispatch: AppointmentDispatch) => {
  await api.appointment.appointmentEndCreate(id.toString());

  dispatch({ type: 'END_APPOINTMENT_SUCCESS', payload: id });
};

export {
  answerAppointmentRequest,
  getUpcomingAppointments,
  getLastAppointment,
  getPastAppointments,
  updateAppointment,
  cancelAppointment,
  startAppointment,
  endAppointment,
};
