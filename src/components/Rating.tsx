import React from 'react';

import {
  StarOneIcon,
  StarTwoIcon,
  StarThreeIcon,
  StarFourIcon,
  StarFiveIcon,
} from '@src/components/icons';

import View from './View';
import Text from './Text';

type RatingProps = {
  rate: string;
}

const Rating = ({ rate }: RatingProps) => {
  const stars = {
    1: <StarOneIcon />,
    2: <StarTwoIcon />,
    3: <StarThreeIcon />,
    4: <StarFourIcon />,
    5: <StarFiveIcon />,
  };

  return (
    <View row alignCenter>
      <Text variant="titleSmallSecondary" spacing={{ mr: 1 }}>{rate}</Text>
      {stars[rate]}
    </View>
  );
};

export default Rating;
