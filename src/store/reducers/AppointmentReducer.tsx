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

export type AppointmentState = Appointment[]

const reducer = (state: AppointmentState, action: AppointmentAction): AppointmentState => {
  switch (action.type) {
    case 'GET_APPOINTMENTS_SUCCESS':
      return action.payload.sort(
        (a, b) => new Date(a.startTime).getTime() - new Date(b.endTime).getTime(),
      );
    default:
      return state;
  }
};

export default reducer;
