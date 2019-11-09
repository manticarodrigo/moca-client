import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import api from '@src/services/api';
import { Review } from '@src/services/openapi';

import { UserState } from '@src/store/reducers/UserReducer';

import useStore from '@src/hooks/useStore';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Modal from '@src/components/Modal';

import Rating from '@src/components/Rating';

type Props = {
  therapist: UserState;
  visible: boolean;
  onClose: () => void;
};

const ReviewsModal = ({ therapist, visible, onClose }: Props) => {
  const { store } = useStore();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const options = { headers: { Authorization: `Token ${store.user.token}` } };
        const { data } = await api.review.reviewRead(therapist.id.toString(), options);

        setReviews(data);
      } catch (e) {
        // console.log(e);
      }
    };

    if (visible) {
      fetchReviews();
    }
  }, [visible]);

  return (
    <Modal
      propagateSwipe
      isVisible={visible}
      onToggle={onClose}
    >
      <View width="100%">
        <View row>
          <View variant="borderBottom" flex={1} height={48} alignCenter justifyCenter>
            <Text variant="semiBold">
              Reviews
            </Text>
          </View>
        </View>
        <FlatList
          data={reviews}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
            <View row alignCenter>
              <View variant="borderBottom" flex={1} row>
                <View row my={3} ml={3}>
                  <View mt={1} px={3}>
                    <Text variant="semiBold">
                      {`${item.patient.firstName} ${item.patient.lastName}`}
                    </Text>
                    <Rating rating={item.rating} />
                    <Text mt={1} variant="regularSmall" color="grey">
                      {item.comment}
                    </Text>
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

export default ReviewsModal;
