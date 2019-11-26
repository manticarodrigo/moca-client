import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Spacing, SpacingProps } from '@src/styles';

import { StarsIcon } from '@src/components/icons';

import View from './View';
import Text from './Text';

type RatingProps = SpacingProps & {
  light?: boolean;
  rating?: number;
}

const Rating = ({ light, rating, ...restProps }: RatingProps) => {
  const [spacing] = Spacing.parseProps(restProps);

  const styles = useMemo(() => StyleSheet.create({
    view: { ...Spacing.getStyles(spacing) },
  }), [spacing]);

  return (
    <View row alignCenter style={styles.view}>
      <Text mr={2} variant="semiBoldLarge" color={light ? 'secondaryLighter' : 'secondary'}>
        {rating ? rating.toFixed(2) : 'N/A'}
      </Text>
      <StarsIcon number={rating} />
    </View>
  );
};

export default Rating;
