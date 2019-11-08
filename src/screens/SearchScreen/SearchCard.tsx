import React from 'react';

import { TherapistSearch } from '@src/store/reducers/SearchReducer';

import { ClockIcon } from '@src/components/icons';

import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';
import Rating from '@src/components/Rating';
import Button from '@src/components/Button';

const sessions = { thirty: '30', fourtyfive: '45', sixty: '60' };

type Props = TherapistSearch & {
  onPressTherapist: (userId: number) => void;
  onMessageTherapist: (user: object) => void;
}

const SearchCard = ({
  id,
  firstName,
  lastName,
  rating,
  prices,
  licenseNumber,
  onPressTherapist,
  onMessageTherapist,
}: Props) => {
  const handlePressCard = () => onPressTherapist(id);
  const handlePressMessage = () => onMessageTherapist({ id, firstName, lastName });

  const sessionTypes = prices.map(({ sessionType }) => sessions[sessionType]).join('/');
  const avgPrice = prices.reduce((total, { price }) => total + price, 0) / prices.length;

  return (
    <View row spacing={{ my: 2, p: 4 }} bgColor="white" onPress={handlePressCard}>
      <Image rounded size={58} />
      <View flex={1} spacing={{ px: 3 }}>
        <View row justifyBetween>
          <View>
            <Text variant="semiBold">
              {firstName}
              {' '}
              {lastName}
            </Text>
            <Rating rating={rating} />
          </View>
          <View alignEnd>
            <View row>
              <ClockIcon />
              <Text ml={2} variant="regular">{sessionTypes || 'N/A'}</Text>
            </View>
            <Text mt={2} variant="title">
              {prices.length ? `~$${avgPrice}` : 'N/A'}
            </Text>
          </View>
        </View>
        <View row spacing={{ pt: 2 }}>
          <View flex={2} variant="borderTopAndRight" spacing={{ py: 2, pl: 3, pr: 5 }}>
            <Text variant="regularSmall" color="grey">
              License Number
            </Text>
          </View>
          <View flex={1} variant="borderTop" spacing={{ py: 2, px: 3 }}>
            <Text variant="regularSmall" color="grey">
              {licenseNumber || 'N/A'}
            </Text>
          </View>
        </View>
        <Button
          variant="secondary"
          spacing={{ mt: 2 }}
          onPress={handlePressMessage}
        >
          Message / Schedule
        </Button>
      </View>
    </View>
  );
};

export default SearchCard;
