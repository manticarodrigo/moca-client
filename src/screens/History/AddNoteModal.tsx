import React, { useState } from 'react';

import ModalView from '@src/components/ModalView';
import View from '@src/components/View';
import Text from '@src/components/Text';

const AddNoteModal = ({ handleArrowClick, modalVisibility }) => {
  const handleInput = () => {

  };


  return (
    <ModalView isVisible={modalVisibility} handleArrowClick={handleArrowClick}>
      <View>
        <Text>Ahmed Tarek</Text>
      </View>
    </ModalView>
  );
};

export default AddNoteModal;
