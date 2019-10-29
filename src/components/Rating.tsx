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
  rating?: number;
  spacing?: SpacingProp;
}

const stars = {
  0: <StarZeroIcon />,
  1: <StarOneIcon />,
  2: <StarTwoIcon />,
  3: <StarThreeIcon />,
  4: <StarFourIcon />,
  5: <StarFiveIcon />,
};

const Rating = ({ rating, spacing }: RatingProps) => {
  const styles = useMemo(() => StyleSheet.create({
    view: { ...Spacing.getStyles(spacing) },
  }), [spacing]);

  const { icon, count } = useMemo(() => {
    if (!rating) {
      return { count: 'N/A', icon: stars[0] };
    }

    return { count: rating, icon: stars[Math.floor(rating)] };
  }, [rating]);

  return (
    <View row alignCenter style={styles.view}>
      <Text variant="titleSmallSecondary" spacing={{ m: 1 }}>{count}</Text>
      {icon}
    </View>
  );
};

export default Rating;
