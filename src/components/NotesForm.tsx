import React, { useMemo } from 'react';

import { Appointment } from '@src/store/reducers/AppointmentReducer';

import Form from './Form';

type Props = {
  appointment: Appointment;
  onSubmit: (values: Appointment['note']) => void;
}

const NotesForm = ({ appointment, onSubmit }: Props) => {
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

  return (
    <Form
      fieldConfig={fieldConfig}
      images={[]}
      submitText="Save Notes"
      onSubmit={onSubmit}
    />
  );
};

export default NotesForm;
