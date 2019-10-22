import React from 'react';

import QualificationsContent from '@src/screens/QualificationsScreen/QualificationsContent';

import Modal from '@src/components/Modal';
import View from '@src/components/View';
import Text from '@src/components/Text';


const QualificationsModal = ({ visible, onToggle }) => (
  <Modal
    propagateSwipe
    isVisible={visible}
    onToggle={onToggle}
  >
    <View>
      <View variant="borderBottom" alignCenter justifyCenter spacing={{ py: 4 }}>
        <Text variant="titleSmall">
          Qualifications
        </Text>
      </View>
      <QualificationsContent modal closeInputModal={onToggle} />
      <View spacing={{ pt: 6 }} />
    </View>
  </Modal>
);

export default QualificationsModal;
