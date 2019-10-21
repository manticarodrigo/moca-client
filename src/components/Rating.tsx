import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Spacing, SpacingProp } from '@src/styles';

import {
  StarZeroIcon,
  StarOneIcon,
  StarTwoIcon,
  StarThreeIcon,
  StarFourIcon,
  StarFiveIcon,
} from '@src/components/icons';

import View from './View';
import Text from './Text';

type RatingProps = {
  rating: number;
  spacing?: SpacingProp;
}

const Rating = ({ rating, spacing }: RatingProps) => {
  const stars = {
    0: <StarZeroIcon />,
    1: <StarOneIcon />,
    2: <StarTwoIcon />,
    3: <StarThreeIcon />,
    4: <StarFourIcon />,
    5: <StarFiveIcon />,
  };

  const styles = useMemo(() => StyleSheet.create({
    view: { ...Spacing.getStyles(spacing) },
  }), [spacing]);

  return (
    <View row alignCenter style={styles.view}>
      <Text variant="titleSmallSecondary" spacing={{ m: 1 }}>{rating}</Text>
      {stars[Math.floor(rating)]}
    </View>
  );
};

export default Rating;
