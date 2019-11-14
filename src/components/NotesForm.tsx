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

  const fieldConfig = useMemo(() => {
    const {
      subjective = '',
      objective = '',
      treatment = '',
      assessment = '',
      diagnosis = '',
    } = note || {};

    return {
      subjective: { multiline: true, value: subjective, placeholder: 'Subjective' },
      objective: { multiline: true, value: objective, placeholder: 'Objective' },
      treatment: { multiline: true, value: treatment, placeholder: 'Treatment' },
      assessment: { multiline: true, value: assessment, placeholder: 'Assessment' },
      diagnosis: { multiline: true, value: diagnosis, placeholder: 'Diagnosis' },
    };
  }, [note]);

  const onPressSubmit = async (fields) => {
    await dispatch(updateAppointment(appointment.id, { note: fields }));

    onSubmit();
  };

  return visible ? (
    <Form
      fieldConfig={fieldConfig}
      images={[]}
      submitText="Save Notes"
      onSubmit={onPressSubmit}
    />
  ) : null;
};

export default NotesForm;
