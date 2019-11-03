
import { AppointmentAction } from '@src/store/actions/AppointmentAction';
import { Address } from '@src/store/reducers/ConversationReducer';

import { Appointment as BadAppointment } from '@src/services/openapi';

export type Appointment = Omit<BadAppointment, 'otherParty' | 'startTime' | 'address'> & {
  startTime: string;
  otherParty: {
    id: number;
    firstName: string;
    lastName: string;
    image: string;
  };
  address: Address;
}

export type AppointmentState = {
  upcoming: Appointment[];
  last: Appointment;
  past: Appointment[];
};

function updateItem(key: keyof AppointmentState, state, payload) {
  const index = state[key].findIndex((val) => val.id === payload.id);

  if (index === -1) {
    return state;
  }

  state[key][index] = { ...state[key][index], ...payload };

  return state;
}

const reducer = (state: AppointmentState, action: AppointmentAction): AppointmentState => {
  switch (action.type) {
    case 'GET_UPCOMING_APPOINTMENTS_SUCCESS':
      return { ...state, upcoming: action.payload };
    case 'GET_LAST_APPOINTMENT_SUCCESS':
      return { ...state, last: action.payload.length ? action.payload[0] : undefined };
    case 'GET_PAST_APPOINTMENTS_SUCCESS':
      return { ...state, past: action.payload };
    case 'UPDATE_APPOINTMENT_SUCCESS':
      return updateItem('past', state, action.payload);
    default:
      return state;
  }
};

export default reducer;
