/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';

import ModalView from '@src/components/ModalView';
import FormField from '@src/components/FormField';
import StarCard from '@src/components/StarCard';
import View from '@src/components/View';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import AppointmentHeader from '@src/components/AppointmentHeader';


const ReviewModal = ({ appointment }) => {
  const maxRate = 5;
  const [clickedIndex, setClicledIndex] = useState(null);
  const [review, setReview] = useState('');

  let buttonText = 'Skip Review for now';

  if (clickedIndex !== null) { buttonText = 'Add review'; }

  const handleButtonPress = () => {
    if (clickedIndex !== null) {
      //  const ratingInput = clickedIndex + 1;
      // api call
      // close modal
    } else {
      // close ,modal
    }
  };

  return (
    <ModalView
      isVisible
      height={100}
      handleArrowClick={() => ('hello')}
    >
      <View>
        <AppointmentHeader
          appointmentPrice={appointment.appointmentPrice}
          name={appointment.name}
          appointmentDuration={appointment.appointmentDuration}
        />
        <View alignCenter spacing={{ mx: 3 }}>
          <Text spacing={{ mt: 4, mb: 3 }} variant="title">How was your session?</Text>
          <View row alignCenter>
            {[...Array(maxRate)].map((el, index) => (
              <>
                <StarCard
                  key={index}
                  first={index === 0}
                  last={index === maxRate - 1}
                  onPress={() => {
                    if (index === clickedIndex) {
                      setClicledIndex(null);
                    } else {
                      setClicledIndex(index);
                    }
                  }}
                  clicked={index <= clickedIndex && clickedIndex !== null}
                />
              </>
            ))}
          </View>
          <View alignCenter spacing={{ mt: 4, mb: 4 }}>
            <FormField
              placeholder="Add review"
              value={review}
              returnKeyType="done"
              onChangeText={(text) => {
                setReview(text);
              }}
            />
          </View>
          <View row>
            <View flex={1}>
              <Button
                onPress={handleButtonPress}
              >
                {buttonText}
              </Button>
            </View>
          </View>
        </View>
      </View>
    </ModalView>
  );
};

export default ReviewModal;