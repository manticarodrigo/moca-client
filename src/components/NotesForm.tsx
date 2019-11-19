import React, { useState, useMemo } from 'react';
import { differenceInHours } from 'date-fns';

import { Appointment } from '@src/store/reducers/AppointmentReducer';
import {
  updateAppointmentNote,
  deleteAppointmentNoteImage,
} from '@src/store/actions/AppointmentAction';

import useStore from '@src/hooks/useStore';

import Form from './Form';
import Toast from './Toast';

type Props = {
  visible: boolean;
  appointment: Appointment;
  onSubmit: () => void;
}

type ToastState = {
  type: 'success' | 'error';
  message: string;
}

const NotesForm = ({ visible, appointment, onSubmit }: Props) => {
  const { dispatch } = useStore();
  const { note, endTime } = appointment || {};
  const { images } = note || {};

  const [toastState, setToastState] = useState<ToastState>();

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

  const notesTimeLeft = useMemo(() => {
    const endDate = new Date(endTime);
    const hoursSinceEnd = differenceInHours(new Date(), endDate);

    let _notesTimeLeft = 48;
    if (hoursSinceEnd > 0) {
      _notesTimeLeft = Math.max(48 - hoursSinceEnd, 0);
    }

    return _notesTimeLeft;
  }, [endTime]);

  const onPressDeleteImage = async (id: number) => {
    try {
      await dispatch(deleteAppointmentNoteImage(appointment.id, id));

      setToastState({ type: 'success', message: 'Image deletion successfully.' });
    } catch (e) {
      const { detail } = e.response.data;
      setToastState({ type: 'error', message: detail || 'Failed to delete image.' });
    }
  };

  const onPressSubmit = async (fields) => {
    try {
      await dispatch(updateAppointmentNote(appointment.id, fields));

      setToastState({ type: 'success', message: 'Appointment note updated successfully.' });
      setTimeout(onSubmit, 2000);
    } catch (e) {
      const { detail } = e.response.data;
      setToastState({ type: 'error', message: detail || 'Failed to update Appointment note.' });
    }
  };

  return visible ? (
    <>
      <Form
        readonly={notesTimeLeft <= 0}
        visible={visible}
        initialState={initialState}
        props={props}
        images={images}
        submitText="Save Notes"
        onSubmit={onPressSubmit}
        onDeleteImage={onPressDeleteImage}
      />
      {!!toastState && (
        <Toast error={toastState.type === 'error'} onClose={() => setToastState(undefined)}>
          {toastState.message}
        </Toast>
      )}
    </>
  ) : null;
};

export default NotesForm;
