import React, { useState, useEffect } from 'react';


import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';
import Modal from '@src/components/Modal';

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
    <Modal isVisible={isModalVisible} onToggle={() => closeInputModal()}>
      <View alignCenter>
        <View row>
          <View variant="borderBottom" flex={1} height={48} alignCenter justifyCenter>
            <Text variant="semiBoldLarge">
              Bookmarks
            </Text>
          </View>
        </View>
        <View alignCenter flex={1} mt={2}>
          {therapists.map((therapist, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <View key={index} row alignCenter>
              <View variant="borderBottom" flex={1} row>
                <View row ml={3} my={3}>
                  <Image rounded size={40} uri={therapist.image} />
                  <View mt={1} px={3}>
                    <Text variant="semiBoldLarge">{therapist.username}</Text>
                    <View row alignCenter>
                      <Text
                        mr={2}
                        variant="regularSmall"
                        color="grey"
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
    </Modal>
  );
};

export default BookmarkedModal;
