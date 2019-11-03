import React, { useMemo } from 'react';

import { Appointment } from '@src/store/reducers/AppointmentReducer';

import { WINDOW_WIDTH } from '@src/utlities/constants';

import View from '@src/components/View';
import AppointmentHeader from '@src/components/AppointmentHeader';
import SegmentedControl from '@src/components/SegmentedControl';

import FormModal from './FormModal';

type Props = {
  visible: boolean;
  current?: boolean;
  appointment: Appointment;
  onOpenTimer?: () => void;
  onSubmit: (values: Appointment['note']) => void;
  onClose: () => void;
}

const NotesModal = ({ visible, current, appointment, onOpenTimer, onClose, onSubmit }: Props) => {
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

  const handleOpenNotes = () => {
    onClose();
    setTimeout(() => onOpenTimer(), 1000);
  };

  const isCurrent = !!(current && onOpenTimer);

  const header = (
    <View width={WINDOW_WIDTH} variant="borderBottom">
      <View row spacing={{ py: 2, px: 4 }}>
        <AppointmentHeader minimal={isCurrent} isTherapist appointment={appointment} />
      </View>
      {isCurrent && (
        <SegmentedControl
          light
          selected="notes"
          options={[{ value: 'timer', label: 'Timer' }, { value: 'notes', label: 'Notes' }]}
          onChange={handleOpenNotes}
        />
      )}
    </View>
  );

  return (
    <FormModal
      visible={visible}
      fieldConfig={fieldConfig}
      images={[]}
      header={header}
      submitText="Save Notes"
      onSubmit={onSubmit}
      onClose={onClose}
    />
  );
};

export default NotesModal;
