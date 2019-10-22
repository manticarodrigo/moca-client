import React from 'react';

import { WINDOW_WIDTH } from '@src/utlities/constants';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Modal from '@src/components/Modal';
import PlacesSearch from '@src/components/PlacesSearch';

import AddLocationBigIcon from '@src/components/icons/AddLocationBigIcon';

const AddressModal = ({ isVisible, onClose, onSubmit }) => (
  <Modal
    propagateSwipe
    avoidKeyboard
    marginTop={50}
    isVisible={isVisible}
    onToggle={onClose}
  >
    <View scroll>
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
      <View width={WINDOW_WIDTH} alignCenter spacing={{ py: 4, px: 3 }}>
        <PlacesSearch onSelect={onSubmit} />
      </View>
    </View>
  </Modal>
);

export default AddressModal;
