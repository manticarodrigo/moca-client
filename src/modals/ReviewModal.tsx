/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';

import { Appointment } from '@src/store/reducers/AppointmentReducer';

import { WINDOW_WIDTH } from '@src/utlities/constants';

import { Views } from '@src/styles';

import StarIcon from '@src/components/icons/StarIcon';

import Modal from '@src/components/Modal';
import View from '@src/components/View';
import KeyboardAwareScrollView from '@src/components/KeyboardAwareScrollView';
import AppointmentHeader from '@src/components/AppointmentHeader';
import FormField from '@src/components/FormField';
import Text from '@src/components/Text';
import Button from '@src/components/Button';

type VariantKey = keyof typeof Views;

type StarProps = {
  first: boolean;
  last: boolean;
  onPress: () => void;
  clicked: boolean;
}

const Star = ({ first, last, onPress, clicked }: StarProps) => {
  let viewVariant: VariantKey = 'star';

  if (first) { viewVariant = 'starFirst'; }
  if (last) { viewVariant = 'starLast'; }

  return (
    <View
      alignCenter
      p={3}
      variant={viewVariant}
      bgColor={clicked ? 'secondaryLight' : 'white'}
      onPress={onPress}
    >
      <StarIcon clicked={clicked} />
    </View>
  );
};


const maxRate = 5;

type Props = {
  visible: boolean;
  appointment: Appointment;
  onSubmit: (review: Appointment['review']) => void;
  onClose: () => void;
}
const ReviewModal = ({ visible, appointment, onSubmit, onClose }: Props) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const buttonText = rating ? 'Submit Review' : 'Skip Review for now';

  useEffect(() => {
    let { review } = appointment || {};

    if (!review) {
      review = { rating: 0, comment: '' };
    }

    setRating(review.rating);
    setComment(review.comment);
  }, [appointment]);

  const onPressRating = (starsCount: number) => () => setRating(starsCount);

  const handleSubmit = () => {
    if (rating) {
      onSubmit({ rating, comment });
    }
  };

  return (
    <Modal isVisible={visible} onToggle={onClose}>
      <View row py={2} px={4} variant="borderBottom">
        <AppointmentHeader isTherapist={false} appointment={appointment} />
      </View>
      <KeyboardAwareScrollView contentContainerStyle={{ width: WINDOW_WIDTH }}>
        <View style={{ width: 'auto', marginRight: 'auto', marginLeft: 'auto' }}>
          <Text mt={4} mb={3} variant="title" align="center">
            How was your session?
          </Text>
          <View row alignCenter variant="shadow">
            {[...Array(maxRate)].map((_, index) => (
              <Star
                key={index}
                first={index === 0}
                last={index === maxRate - 1}
                onPress={onPressRating(index + 1)}
                clicked={!!(rating && index <= rating - 1)}
              />
            ))}
          </View>
          <View alignCenter my={4}>
            <FormField
              multiline
              placeholder="Add review"
              value={comment}
              returnKeyType="done"
              onChangeText={setComment}
            />
          </View>
          <View row>
            <View flex={1}>
              <Button disabled={!rating} onPress={handleSubmit}>
                {buttonText}
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
};

export default ReviewModal;
