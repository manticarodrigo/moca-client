import React from 'react';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Modal, { ModalScrollView } from '@src/components/Modal';
import PlacesSearch from '@src/components/PlacesSearch';

import AddLocationBigIcon from '@src/components/icons/AddLocationBigIcon';

const AddressModal = ({ isVisible, onClose, onSubmit }) => (
  <Modal
    isVisible={isVisible}
    onToggle={onClose}
  >
    <ModalScrollView>
      <View alignCenter spacing={{ py: 5 }}>
        <AddLocationBigIcon />
        <Text variant="title" spacing={{ mt: 4 }}>Where are you located?</Text>
        <Text variant="regular" spacing={{ mt: 2 }}>
          Enter your address to check MOCA&apos;s
        </Text>
        <Text variant="regular">
          availability in your area.
        </Text>
      </View>
      <View alignCenter spacing={{ py: 4, px: 3 }}>
        <PlacesSearch onSelect={onSubmit} />
      </View>
    </ModalScrollView>
  </Modal>
);

export default AddressModal;
