import React, { useRef } from 'react';
import { ScrollView } from 'react-native';

import { WINDOW_WIDTH } from '@src/utlities/constants';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Modal from '@src/components/Modal';
import PlacesSearch from '@src/components/PlacesSearch';

import AddLocationBigIcon from '@src/components/icons/AddLocationBigIcon';

const AddressModal = ({ isVisible, onClose, onSubmit }) => {
  const scrollViewRef = useRef<ScrollView>();

  const scrollToEnd = () => {
    if (scrollViewRef.current) {
      setTimeout(() => scrollViewRef.current.scrollToEnd());
    }
  };

  const onChangeText = () => scrollToEnd();

  return (
    <Modal
      propagateSwipe
      avoidKeyboard
      marginTop={50}
      isVisible={isVisible}
      onToggle={onClose}
    >
      <ScrollView ref={scrollViewRef}>
        <View alignCenter spacing={{ py: 5 }}>
          <AddLocationBigIcon />
          <Text variant="title" mt={4}>Where are you located?</Text>
          <Text variant="regular" mt={2}>
            Enter your address to check MOCA&apos;s
          </Text>
          <Text variant="regular">
            availability in your area.
          </Text>
        </View>
        <View width={WINDOW_WIDTH} alignCenter spacing={{ py: 4, px: 3 }}>
          <PlacesSearch onChangeText={onChangeText} onSelect={onSubmit} />
        </View>
      </ScrollView>
    </Modal>
  );
};

export default AddressModal;
