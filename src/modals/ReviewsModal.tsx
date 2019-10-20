import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';


import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';
import Modal from '@src/components/Modal';

import { mockImg } from '@src/services/mock';
import { StarsIcon } from '@src/components/icons';

const mockReviews = Array.from({ length: 23 }, (v, i) => ({
  id: i.toString(),
  username: 'Jane Doe',
  comment: 'It was very good!',
  rating: 4,
}));


type ReviewsModalProps = {
  id?: number;
  closeInputModal: () => void;
  isModalVisible: boolean;
};

const ReviewsModal = (
  {
    id,
    closeInputModal,
    isModalVisible,
  }: ReviewsModalProps,
) => {
  // eslint-disable-next-line no-shadow
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // fetch reviws by id,
    setReviews(mockReviews);
  }, [reviews]);


  return (
    <Modal
      propagateSwipe
      isVisible={isModalVisible}
      onToggle={() => closeInputModal()}
    >
      <View width="100%">
        <View row>
          <View variant="borderBottom" flex={1} height={48} alignCenter justifyCenter>
            <Text variant="titleSmall">
              Reviews
            </Text>
          </View>
        </View>
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View row alignCenter>
              <View variant="borderBottom" flex={1} row>
                <View row spacing={{ ml: 3, my: 3 }}>
                  <Image rounded size={40} uri={mockImg} />
                  <View column spacing={{ px: 3, mt: 1 }}>
                    <Text variant="titleSmall">{item.username}</Text>
                    <View row alignCenter>
                      <Text
                        spacing={{ mr: 2 }}
                        variant="regularGrey"
                      >
                        {item.rating}
                      </Text>
                      <StarsIcon number={item.rating} />
                    </View>
                    <View width={300}>
                      <Text variant="regularGrey">{item.comment}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </Modal>
  );
};

ReviewsModal.navigationOptions = {
  header: null,
};

export default ReviewsModal;
