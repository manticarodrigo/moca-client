import React, { useState, useEffect } from 'react';


import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';
import ModalView from '@src/components/ModalView';

import { mockImg } from '@src/services/mock';
import { StarsIcon } from '@src/components/icons';

type BookmarkedProps = {
  closeInputModal: () => void;
  isModalVisible: boolean;
};

const BookmarkedModal = (
  {
    closeInputModal,
    isModalVisible,
  }: BookmarkedProps,
) => {
  // eslint-disable-next-line no-shadow
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
    // fetch therapists by id,
    setTherapists(therapists);
  }, [therapists]);


  return (
    <ModalView
      isVisible={isModalVisible}
      onBackdropPress={() => closeInputModal()}
      onSwipeComplete={() => closeInputModal()}
      handleArrowClick={() => closeInputModal()}
    >
      <View alignCenter>
        <View row>
          <View variant="borderBottom" flex={1} height={48} alignCenter justifyCenter>
            <Text variant="titleSmall">
              Bookmarks
            </Text>
          </View>
        </View>
        <View alignCenter spacing={{ mt: 2 }} flex={1}>
          {therapists.map((therapist, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <View key={index} row alignCenter>
              <View variant="borderBottom" flex={1} row>
                <View row spacing={{ ml: 3, my: 3 }}>
                  <Image rounded size={40} uri={mockImg} />
                  <View column spacing={{ px: 3, mt: 1 }}>
                    <Text variant="titleSmall">{therapist.username}</Text>
                    <View row alignCenter>
                      <Text
                        spacing={{ mr: 2 }}
                        variant="regularGrey"
                      >
                        {therapist.rating}
                      </Text>
                      <StarsIcon number={therapist.rating} />
                    </View>
                  </View>
                  <View flex={1} />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ModalView>
  );
};

export default BookmarkedModal;
