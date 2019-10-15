import React from 'react';

import QualificationsContent from '@src/screens/QualificationsScreen/QualificationsContent';

import ModalView from '@src/components/ModalView';
import View from '@src/components/View';
import Text from '@src/components/Text';


const QualificationsModal = ({ isModalVisible, closeInputModal }) => (
  <ModalView
    propagateSwipe
    height={100}
    isVisible={isModalVisible}
    onBackdropPress={() => {
      closeInputModal();
    }}
    onSwipeComplete={() => {
      closeInputModal();
    }}
    handleArrowClick={() => {
      closeInputModal();
    }}
  >
    <View>
      <View flex={1}>
        <View variant="borderBottom" flex={1} height={48} alignCenter justifyCenter>
          <Text variant="titleSmall">
            Qualifications
          </Text>
        </View>
        <QualificationsContent modal closeInputModal={closeInputModal} />
      </View>
    </View>
  </ModalView>
);

export default QualificationsModal;
