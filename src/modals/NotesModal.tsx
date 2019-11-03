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
  const { note, otherParty, startTime } = appointment || {};

  const { otherPartyName, dateString } = useMemo(() => {
    const { firstName = '', lastName = '' } = otherParty || {};

    return {
      otherPartyName: `${firstName} ${lastName}`,
      dateString: startTime ? format(new Date(startTime), 'MM/dd/yyyy hh:mm aaaa') : '',
    };
  }, [otherParty, startTime]);

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
