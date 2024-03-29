import React from 'react';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Modal from '@src/components/Modal';

const ContentModal = ({ visible, title, json, onClose }) => (
  <Modal isVisible={visible} onToggle={onClose}>
    <View safeArea>
      <View row>
        <View variant="borderBottom" flex={1} height={48} alignCenter justifyCenter>
          <Text variant="semiBoldLarge">{title}</Text>
        </View>
      </View>
      <View flex={1} m={3}>
        <Text variant="regular">
          {json.content}
        </Text>
      </View>
    </View>
  </Modal>
);

export default ContentModal;
