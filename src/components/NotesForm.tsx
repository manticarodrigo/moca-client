import React, { useMemo } from 'react';

import { Appointment } from '@src/store/reducers/AppointmentReducer';
import { updateAppointment } from '@src/store/actions/AppointmentAction';

import useStore from '@src/hooks/useStore';

import Form from './Form';

type Props = {
  visible: boolean;
  appointment: Appointment;
  onSubmit: () => void;
}

const NotesForm = ({ visible, appointment, onSubmit }: Props) => {
  const { dispatch } = useStore();
  const { note } = appointment || {};

  const { initialState, props } = useMemo(() => {
    const {
      subjective = '',
      objective = '',
      treatment = '',
      assessment = '',
      diagnosis = '',
    } = note || {};

    return {
      initialState: { subjective, objective, treatment, assessment, diagnosis },
      props: {
        subjective: { multiline: true, placeholder: 'Subjective' },
        objective: { multiline: true, placeholder: 'Objective' },
        treatment: { multiline: true, placeholder: 'Treatment' },
        assessment: { multiline: true, placeholder: 'Assessment' },
        diagnosis: { multiline: true, placeholder: 'Diagnosis' },
      },
    };
  }, [note]);

  const onPressSubmit = async (fields) => {
    await dispatch(updateAppointment(appointment.id, { note: fields }));

    onSubmit();
  };

  return visible ? (
    <Form
      visible={visible}
      initialState={initialState}
      props={props}
      images={[]}
      submitText="Save Notes"
      onSubmit={onPressSubmit}
    />
  ) : null;
};

export default NotesForm;
