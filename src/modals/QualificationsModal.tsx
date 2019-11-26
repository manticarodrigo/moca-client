import React from 'react';

import QualificationsContent from '@src/screens/QualificationsScreen/QualificationsContent';

import Modal from '@src/components/Modal';

const QualificationsModal = ({ visible, onToggle }) => (
  <Modal
    propagateSwipe
    isVisible={visible}
    onToggle={onToggle}
  >
    <QualificationsContent modal onClose={onToggle} />
  </Modal>
);

export default QualificationsModal;
