import React from 'react';

import ModalView from '@src/components/ModalView';
import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';

import { StarsIcon, BookmarkIcon } from '@src/components/icons';

import { mockImg } from '@src/services/mock';


import TherapistProfile from '@src/screens/ProfileScreen/TherapistProfile';


const TherapistProfileModal = ({ therapist, isModalVisible, closeInputModal }) => (
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
        <View alignEnd spacing={{ mr: 3 }}>
          <BookmarkIcon />
        </View>
        <View row spacing={{ p: 4 }} bgColor="white">
          <Image rounded size={80} uri={mockImg} />
          <View column justifyCenter spacing={{ px: 3 }}>
            <Text variant="title">{therapist.username}</Text>
            <View row alignCenter>
              <Text
                spacing={{ mr: 2 }}
                variant="lightTextCenter"
              >
                {therapist.rating}
              </Text>
              <StarsIcon number={therapist.rating} />
            </View>
          </View>
        </View>
        <View flex={1} bgColor="white">
          <TherapistProfile therapist={therapist} modal />
        </View>
      </View>
    </View>

  </ModalView>
);

export default TherapistProfileModal;
