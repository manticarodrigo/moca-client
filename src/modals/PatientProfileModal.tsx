import React from 'react';

import ModalView from '@src/components/ModalView';
import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';

import { mockImg } from '@src/services/mock';

import PatientProfile from '@src/screens/ProfileScreen/PatientProfile';


const PatientProfileModal = ({ patient, closeInputModal, isModalVisible }) => (
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

    <View bgColor="lightGrey">
      <View bgColor="white">
        <View row spacing={{ p: 4, ml: 3 }} bgColor="white">
          <Image rounded size={80} uri={mockImg} />
          <View column justifyCenter spacing={{ px: 3 }}>
            <Text variant="title">{patient.username}</Text>
          </View>
        </View>
        <View flex={1} bgColor="white">
          <PatientProfile patient={patient} modal />
        </View>
      </View>
    </View>

  </ModalView>
);

export default PatientProfileModal;
