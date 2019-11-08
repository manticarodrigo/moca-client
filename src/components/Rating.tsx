import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Spacing, SpacingProp } from '@src/styles';

import { StarsIcon } from '@src/components/icons';

import View from './View';
import Text from './Text';

type RatingProps = {
  light?: boolean;
  rating?: number;
  spacing?: SpacingProp;
}

const Rating = ({ light, rating, spacing }: RatingProps) => {
  const styles = useMemo(() => StyleSheet.create({
    view: { ...Spacing.getStyles(spacing) },
  }), [spacing]);

  return (
    <View row alignCenter style={styles.view}>
      <Text spacing={{ mr: 2 }} variant="semiBold" color={light ? 'secondaryLighter' : 'secondary'}>
        {rating ? rating.toFixed(2) : 'N/A'}
      </Text>
      <StarsIcon number={rating} />
    </View>
  );
};

export default Rating;
