import React, { useMemo } from 'react';

import { TherapistSearch } from '@src/store/reducers/SearchReducer';
import { PriceSessionTypeEnum } from '@src/services/openapi';

import { ClockIcon } from '@src/components/icons';

import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';
import Rating from '@src/components/Rating';
import Button from '@src/components/Button';

const sessions = { evaluation: 'Eval', thirty: '30', fourtyfive: '45', sixty: '60' };

type Props = TherapistSearch & {
  onPressTherapist: (userId: number) => void;
  onMessageTherapist: (user: object) => void;
}

const SearchCard = ({
  id,
  image,
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

  const sessionTypes = useMemo(() => {
    const types = [];
    const evaluation = prices.find(
      ({ sessionType }) => sessionType === PriceSessionTypeEnum.Evaluation,
    );
    const thirty = prices.find(
      ({ sessionType }) => sessionType === PriceSessionTypeEnum.Thirty,
    );
    const fourtyfive = prices.find(
      ({ sessionType }) => sessionType === PriceSessionTypeEnum.Fourtyfive,
    );
    const sixty = prices.find(
      ({ sessionType }) => sessionType === PriceSessionTypeEnum.Sixty,
    );

    if (evaluation) types.push(sessions.evaluation);
    if (thirty) types.push(sessions.thirty);
    if (fourtyfive) types.push(sessions.fourtyfive);
    if (sixty) types.push(sessions.sixty);

    return types.join(' | ');
  }, [prices]);
  const avgPrice = prices.reduce((total, { price }) => total + price, 0) / prices.length;

  return (
    <View row my={2} p={4} bgColor="white" onPress={handlePressCard}>
      <Image rounded size={58} uri={image} />
      <View flex={1} px={3}>
        <View row justifyBetween>
          <View>
            <Text variant="semiBoldLarge">
              {`${firstName} ${lastName}`}
            </Text>
            <Rating rating={rating} />
          </View>
          <View alignEnd>
            <View row>
              <ClockIcon />
              <Text ml={2} variant="regular">{sessionTypes || 'N/A'}</Text>
            </View>
            <Text mt={2} variant="title">
              {prices.length ? `${prices.length > 1 ? '~' : ''}$${avgPrice}` : 'N/A'}
            </Text>
          </View>
        </View>
        <View row pt={2}>
          <View flex={2} py={2} pr={5} pl={3} variant="borderTopAndRight">
            <Text variant="regularSmall" color="grey">
              License Number
            </Text>
          </View>
          <View flex={1} py={2} px={3} variant="borderTop">
            <Text variant="regularSmall" color="grey">
              {licenseNumber || 'N/A'}
            </Text>
          </View>
        </View>
        <Button
          mt={2}
          variant="secondary"
          onPress={handlePressMessage}
        >
          Message / Schedule
        </Button>
      </View>
    </View>
  );
};

export default SearchCard;
