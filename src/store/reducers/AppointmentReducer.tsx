import { AppointmentAction } from '@src/store/actions/AppointmentAction';

import { Appointment as BadAppointment } from '@src/services/openapi';

export type Appointment = Omit<BadAppointment, 'otherParty' | 'startTime'> & {
  startTime: string;
  otherParty: {
    id: number;
    firstName: string;
    lastName: string;
    image: string;
  };
}

export type AppointmentState = Appointment[]

const reducer = (state: AppointmentState, action: AppointmentAction): AppointmentState => {
  switch (action.type) {
    case 'GET_APPOINTMENTS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
