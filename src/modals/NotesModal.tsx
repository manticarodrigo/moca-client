import React, { useMemo } from 'react';

import { format } from 'date-fns';

import { Appointment } from '@src/store/reducers/AppointmentReducer';

import FormModal from './FormModal';

type Props = {
  appointment: Appointment;
  visible: boolean;
  onSubmit: (values: Appointment['note']) => void;
  onClose: () => void;
}

const NotesModal = ({ appointment, onClose, onSubmit }: Props) => {
  const { formFields, otherPartyName, dateString } = useMemo(() => {
    const { note, otherParty, startTime } = appointment || {};

    const {
      subjective = '',
      objective = '',
      treatment = '',
      assessment = '',
      diagnosis = '',
    } = note || {};

    const { firstName = '', lastName = '' } = otherParty || {};

    return {
      formFields: { subjective, objective, treatment, assessment, diagnosis },
      otherPartyName: `${firstName} ${lastName}`,
      dateString: startTime ? format(new Date(startTime), 'MM/dd/yyyy hh:mm aaaa') : '',
    };
  }, [appointment]);

  const fieldConfig = useMemo(() => ({
    subjective: { multiline: true, value: formFields.subjective, placeholder: 'Subjective' },
    objective: { multiline: true, value: formFields.objective, placeholder: 'Objective' },
    treatment: { multiline: true, value: formFields.treatment, placeholder: 'Treatment' },
    assessment: { multiline: true, value: formFields.assessment, placeholder: 'Assessment' },
    diagnosis: { multiline: true, value: formFields.diagnosis, placeholder: 'Diagnosis' },
  }), [formFields]);

  return (
    <FormModal
      visible={!!appointment}
      fieldConfig={fieldConfig}
      images={[]}
      title={otherPartyName}
      subtitle={dateString}
      submitText="Save Notes"
      onSubmit={onSubmit}
      onClose={onClose}
    />
  );
};

export default NotesModal;
