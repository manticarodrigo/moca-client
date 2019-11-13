import React, { useState, useEffect } from 'react';

import { AppointmentStatusEnum } from '@src/services/openapi';
import { getUpcomingAppointments } from '@src/store/actions/AppointmentAction';

import useStore from '@src/hooks/useStore';

import { WINDOW_WIDTH } from '@src/utlities/constants';

import Modal from '@src/components/Modal';
import View from '@src/components/View';
import AppointmentHeader from '@src/components/AppointmentHeader';
import SegmentedControl from '@src/components/SegmentedControl';
import Timer from '@src/components/Timer';
import NotesForm from '@src/components/NotesForm';

type Tab = 'timer' | 'notes';
const tabOptions = [{ value: 'timer', label: 'Timer' }, { value: 'notes', label: 'Notes' }];

const AppointmentModal = ({
  visible,
  isTherapist,
  appointment,
  onClose,
}) => {
  const { dispatch } = useStore();
  const inProgress = (appointment || {}).status === AppointmentStatusEnum.InProgress;
  const completed = (appointment || {}).status === AppointmentStatusEnum.Completed;

  const [activeTab, setActiveTab] = useState<Tab>('timer');


  useEffect(() => {
    if (completed && activeTab === 'timer') {
      setActiveTab('notes');
    }
  }, [appointment]);


  const onChangeTab = (value: Tab) => {
    setActiveTab(value);
  };

  const onSubmitNotes = () => {
    dispatch(getUpcomingAppointments());

    if (completed) {
      onClose();
    } else {
      setActiveTab('timer');
    }
  };

  return (
    <Modal isVisible={visible} onToggle={onClose}>
      <View width={WINDOW_WIDTH} variant="borderBottom">
        <View row py={2} px={4}>
          <AppointmentHeader
            minimal={inProgress}
            isTherapist={isTherapist}
            appointment={appointment}
          />
        </View>
        {!!(isTherapist && inProgress) && (
          <SegmentedControl
            light
            selected={activeTab}
            options={tabOptions}
            onChange={onChangeTab}
          />
        )}
      </View>
      {activeTab === 'timer' && (
        <Timer
          focused={activeTab === 'timer'}
          isTherapist={isTherapist}
          appointment={appointment}
          onEnd={onClose}
        />
      )}
      {activeTab === 'notes' && (
        <>
          <NotesForm
            appointment={appointment}
            onSubmit={onSubmitNotes}
          />
          <View py={3} />
        </>
      )}
    </Modal>
  );
};

export default AppointmentModal;
