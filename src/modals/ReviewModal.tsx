/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';

import Modal from '@src/components/Modal';
import View from '@src/components/View';
import KeyboardAwareScrollView from '@src/components/KeyboardAwareScrollView';
import StarCard from '@src/components/StarCard';
import AppointmentHeader from '@src/components/AppointmentHeader';
import FormField from '@src/components/FormField';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import { WINDOW_WIDTH } from '@src/utlities/constants';

const maxRate = 5;

const ReviewModal = ({ visible, appointment, onSubmit, onClose }) => {
  const [visibleAsync, setVisibleAsync] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const buttonText = rating ? 'Submit Review' : 'Skip Review for now';

  useEffect(() => {
    setTimeout(() => setVisibleAsync(visible), 500);
  }, [visible]);

  const onPressRating = (index: number) => () => setRating(index);

  const handleSubmit = () => {
    if (rating) {
      onSubmit();
    }
  };

  return (
    <Modal isVisible={visibleAsync} onToggle={onClose}>
      <View row spacing={{ py: 2, px: 4 }} variant="borderBottom">
        <AppointmentHeader isTherapist={false} appointment={appointment} />
      </View>
      <KeyboardAwareScrollView contentContainerStyle={{ width: WINDOW_WIDTH }}>
        <View style={{ width: 'auto', marginRight: 'auto', marginLeft: 'auto' }}>
          <Text spacing={{ mt: 4, mb: 3 }} variant="title" typography={{ align: 'center' }}>
            How was your session?
          </Text>
          <View row alignCenter variant="shadow">
            {[...Array(maxRate)].map((value, index) => (
              <StarCard
                key={index}
                first={index === 0}
                last={index === maxRate - 1}
                onPress={onPressRating(index)}
                clicked={!!(rating && index <= rating)}
              />
            ))}
          </View>
          <View alignCenter spacing={{ mt: 4, mb: 4 }}>
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
