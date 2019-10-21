import { AppointmentAction } from '@src/store/actions/AppointmentAction';

import { Appointment } from '@src/services/openapi';

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
