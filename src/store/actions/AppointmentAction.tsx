import { Dispatch } from 'react';
import { subHours } from 'date-fns';

import api from '@src/services/api';

import { Appointment } from '@src/store/reducers/AppointmentReducer';
import { AppointmentCancellation, Note } from '@src/services/openapi';

export type AppointmentAction =
  | { type: 'ANSWER_APPOINTMENT_REQUEST_SUCCESS' }
  | { type: 'GET_UPCOMING_APPOINTMENTS_SUCCESS'; payload: Appointment[] }
  | { type: 'GET_LAST_APPOINTMENT_SUCCESS'; payload: Appointment[] }
  | { type: 'GET_FINISHED_APPOINTMENTS_SUCCESS'; payload: Appointment[] }
  | { type: 'GET_PAST_APPOINTMENTS_SUCCESS'; payload: Appointment[] }
  | { type: 'UPDATE_APPOINTMENT_SUCCESS'; payload: Appointment }
  | { type: 'UPDATE_APPOINTMENT_NOTE_SUCCESS'; payload: { id: number; note: Appointment['note'] } }
  | { type: 'DELETE_APPOINTMENT_NOTE_IMAGE_SUCCESS'; payload: { appointmentId: number; imageId: number } }
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
  const query = {
    start: subHours(new Date(), 1).toISOString(),
    hideFinished: true,
    limit: 3,
  };

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

const getFinishedAppointments = () => async (dispatch: AppointmentDispatch) => {
  const start = subHours(new Date(), 1).toISOString();
  const { data } = await api.appointment.appointmentList({ query: { start, onlyFinished: true } });

  // @ts-ignore
  dispatch({ type: 'GET_FINISHED_APPOINTMENTS_SUCCESS', payload: data });
};

const getPastAppointments = () => async (dispatch: AppointmentDispatch) => {
  const end = new Date().toISOString();
  const { data } = await api.appointment.appointmentList({ query: { end } });

  // @ts-ignore
  dispatch({ type: 'GET_PAST_APPOINTMENTS_SUCCESS', payload: data });
};

const updateAppointment = (
  appointmentId: Appointment['id'],
  body: Pick<Appointment, 'review'>,
) => async (dispatch: AppointmentDispatch) => {
  // @ts-ignore
  const { data } = await api.appointment.appointmentPartialUpdate(appointmentId.toString(), body);

  // therapist/patient come back as ids so remove them
  delete data.therapist;
  delete data.patient;

  dispatch({ type: 'UPDATE_APPOINTMENT_SUCCESS', payload: data });
};

const updateAppointmentNote = (
  appointmentId: number,
  form: Note,
) => async (dispatch: AppointmentDispatch) => {
  // eslint-disable-next-line no-undef
  const data = new FormData();

  data.append('subjective', form.subjective);
  data.append('objective', form.objective);
  data.append('treatment', form.treatment);
  data.append('assessment', form.assessment);
  data.append('diagnosis', form.diagnosis);

  form.images.forEach(({ image }) => {
    const uriParts = image.split('.');
    const fileType = uriParts[uriParts.length - 1];
    const name = `appointment-${appointmentId}-time-${new Date().getTime()}.${fileType}`;
    const file = { uri: image, type: fileType, name };
    // @ts-ignore
    data.append('images', file);
  });

  const response = await api.instance.request({
    method: 'patch',
    url: `${api.basePath}/appointment/${appointmentId}/note/`,
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  dispatch({
    type: 'UPDATE_APPOINTMENT_NOTE_SUCCESS',
    payload: {
      id: appointmentId,
      note: response.data,
    },
  });
};

const deleteAppointmentNoteImage = (
  appointmentId: Appointment['id'],
  imageId: Appointment['note']['images'][0]['id'],
) => async (dispatch: AppointmentDispatch) => {
  await api.appointment.appointmentNoteImageDelete(
    appointmentId.toString(),
    imageId.toString(),
  );

  dispatch({ type: 'DELETE_APPOINTMENT_NOTE_IMAGE_SUCCESS', payload: { appointmentId, imageId } });
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
  getFinishedAppointments,
  getPastAppointments,
  updateAppointment,
  updateAppointmentNote,
  deleteAppointmentNoteImage,
  cancelAppointment,
  startAppointment,
  endAppointment,
};
