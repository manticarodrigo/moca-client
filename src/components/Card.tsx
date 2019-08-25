import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { Spacing, Cards } from '@src/styles';
import { SpacingProp } from '@src/styles/spacing';

type CardProps = TouchableOpacityProps & {
  variant?: keyof typeof Cards;
  spacing?: SpacingProp;
  children?: JSX.Element | JSX.Element[];
};

const Card = ({ variant = 'primary', spacing, onPress, children }: CardProps) => {
  const styles = useMemo(() => StyleSheet.create({
    card: {
      ...Cards[variant],
      ...Spacing.get(spacing),
    },
  }), [variant, spacing]);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default Card;
