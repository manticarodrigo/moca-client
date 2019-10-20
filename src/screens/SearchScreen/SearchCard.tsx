import React from 'react';

import { ClockIcon } from '@src/components/icons';

import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';
import Rating from '@src/components/Rating';
import Button from '@src/components/Button';

const SearchCard = ({
  name,
  rating,
  sessionDuration,
  sessionPrice,
  licenseNumber,
  onMessageTherapist,
}) => (
  <View row spacing={{ my: 2, p: 4 }} bgColor="white">
    <Image rounded size={58} />
    <View flex={1} spacing={{ px: 3 }}>
      <View row justifyBetween>
        <View>
          <Text variant="titleSmall">{name}</Text>
          <Rating rate={rating} />
        </View>
        <View alignEnd>
          <View row>
            <ClockIcon />
            <Text variant="regular" spacing={{ ml: 2 }}>{sessionDuration}</Text>
          </View>
          <Text variant="titlePrimary" spacing={{ mt: 2 }}>{sessionPrice}</Text>
        </View>
      </View>
      <View row spacing={{ pt: 2 }}>
        <View variant="borderTopAndRight" spacing={{ py: 2, pl: 3, pr: 5 }}>
          <Text variant="regularSmallGrey">
            License Number
          </Text>
        </View>
        <View variant="borderTop" spacing={{ py: 2, px: 3 }}>
          <Text variant="regularSmallGrey">
            {licenseNumber}
          </Text>
        </View>
      </View>
      <Button
        variant="secondary"
        spacing={{ mt: 2 }}
        onPress={onMessageTherapist}
      >
        Message / Schedule
      </Button>
    </View>
  </View>
);

export default SearchCard;
