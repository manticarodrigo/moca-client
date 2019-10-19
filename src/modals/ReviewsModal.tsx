import React, { useState, useEffect } from 'react';


import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';
import ModalView from '@src/components/ModalView';

import { mockImg } from '@src/services/mock';
import { StarsIcon } from '@src/components/icons';
// add scroll view

const mockReviews = [{
  username: 'ahmed',
  comment: 'it was very good asohfjdasjnfjlasdnjlsadnljasndjlasndjkla alsjdlasdnlj asdnjlkj',
  rating: 4,
},
{
  username: 'ahmed',
  comment: 'it was very good',
  rating: 1,
}, {
  username: 'ahmed',
  comment: 'it was very good',
  rating: 2,
},
{
  username: 'ahmed',
  comment: 'it was very good',
  rating: 4,
},
];


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
              Reviews
            </Text>
          </View>
        </View>
        <View alignCenter spacing={{ mt: 2 }} flex={1}>
          {reviews.map((review, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <View key={index} row alignCenter>
              <View variant="borderBottom" flex={1} row>
                <View row spacing={{ ml: 3, my: 3 }}>
                  <Image rounded size={40} uri={mockImg} />
                  <View column spacing={{ px: 3, mt: 1 }}>
                    <Text variant="titleSmall">{review.username}</Text>
                    <View row alignCenter>
                      <Text
                        spacing={{ mr: 2 }}
                        variant="regularGrey"
                      >
                        {review.rating}
                      </Text>
                      <StarsIcon number={review.rating} />
                    </View>
                    <View width={300}>
                      <Text variant="regularGrey">{review.comment}</Text>
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

ReviewsModal.navigationOptions = {
  header: null,
};

export default ReviewsModal;
