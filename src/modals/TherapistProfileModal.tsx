import React from 'react';

import ModalView from '@src/components/ModalView';
import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';

import { StarsIcon } from '@src/components/icons';

import { mockImg } from '@src/services/mock';


import TherapistProfile from '@src/screens/ProfileScreen/TherapistProfile';


const TherapistProfileModal = ({ therapist, isModalVisible, closeInputModal }) => (
  <ModalView
    propagateSwipe
    height={200}
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
    <View row>
      <View flex={1} column>
        <View row spacing={{ p: 4 }}>
          <Image rounded size={80} uri={mockImg} />
          <View column justifyCenter spacing={{ px: 3 }}>
            <Text variant="titleWhite">{therapist.username}</Text>
            <View row alignCenter>
              <Text
                spacing={{ mr: 2 }}
                variant="lightTextCenter"
              >
                {therapist.rating.toString()}
              </Text>
              <StarsIcon number={therapist.rating} />
            </View>
          </View>
        </View>
        <View>
          <TherapistProfile therapist={therapist} modal />
        </View>

      </View>
    </View>

  </ModalView>
);

export default TherapistProfileModal;
