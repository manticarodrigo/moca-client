import React, { useRef } from 'react';
import { ScrollView } from 'react-native';

import { WINDOW_WIDTH } from '@src/utlities/constants';

import { AddLocationBigIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Modal from '@src/components/Modal';
import PlacesSearch from '@src/components/PlacesSearch';
import ContainedView from '@src/components/ContainedView';


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
      <ContainedView>
        <ScrollView ref={scrollViewRef} style={{ width: WINDOW_WIDTH, maxWidth: '100%' }}>
          <View alignCenter py={5}>
            <AddLocationBigIcon />
            <Text variant="title" mt={4}>Where are you located?</Text>
            <Text variant="regular" mt={2}>
              Enter your address to check MOCA&apos;s
            </Text>
            <Text variant="regular">
              availability in your area.
            </Text>
          </View>
          <View row width="100%" flex={1} py={4} px={3}>
            <PlacesSearch onChangeText={onChangeText} onSelect={onSubmit} />
          </View>
        </ScrollView>
      </ContainedView>
    </Modal>
  );
};

export default AddressModal;
