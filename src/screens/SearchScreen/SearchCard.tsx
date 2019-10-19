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
  experience,
  licenseNumber,
  onMessageTherapist,
}) => (
  <View spacing={{ my: 2, p: 4 }} bgColor="white">
    <View row justifyBetween>
      <View row>
        <Image rounded size={58} />
        <View spacing={{ p: 2 }}>
          <Text variant="titleSmall" spacing={{ mx: 3 }}>{name}</Text>
          <Rating rate={rating} spacing={{ mx: 3 }} />
        </View>
      </View>
      <View alignEnd spacing={{ py: 2 }}>
        <View row>
          <ClockIcon />
          <Text variant="regular" spacing={{ ml: 2 }}>
            {sessionDuration}
            {' '}
            mins
          </Text>
        </View>
        <Text variant="titlePrimary" spacing={{ mt: 2 }}>
          $

          {sessionPrice}
        </Text>
      </View>
    </View>
    <View row justifyEnd spacing={{ mt: 1, mr: 5 }}>
      <View variant="borderTopAndRight" spacing={{ py: 2, pl: 3, pr: 5 }}>
        <Text variant="regularSmallGrey">
          {experience}
          {' '}
          year of experience
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
      spacing={{ my: 2, mx: 6 }}
      onPress={onMessageTherapist}
    >
      Message / Schedule
    </Button>
  </View>
);

export default SearchCard;
