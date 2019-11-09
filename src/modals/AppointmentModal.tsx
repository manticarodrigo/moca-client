import React, { useState } from 'react';

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
  past = false,
  visible,
  isTherapist,
  appointment,
  onEndTimer = undefined,
  onSubmitNotes,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>(past ? 'notes' : 'timer');

  const onChangeTab = (value: Tab) => {
    setActiveTab(value);
  };

  return (
    <Modal isVisible={visible} onToggle={onClose}>
      <View width={WINDOW_WIDTH} variant="borderBottom">
        <View row py={2} px={4}>
          <AppointmentHeader
            minimal={isTherapist && !past}
            isTherapist={isTherapist}
            appointment={appointment}
          />
        </View>
        {(isTherapist && !past) && (
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
          focused={visible}
          isTherapist={isTherapist}
          appointment={appointment}
          onEnd={onEndTimer}
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
