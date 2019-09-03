import React, { useMemo } from 'react';
import { StyleSheet, Text as RNText, TextProps as RNTextProps } from 'react-native';

import { Spacing, SpacingProp, Typography, TypographyProp } from '@src/styles';

const variants = {
  title: { ...Typography.getStyles({ size: 4, weight: '700', color: 'primary' }) },
  titleSmall: { ...Typography.getStyles({ size: 3, weight: '700', color: 'primary' }) },
  regular: { ...Typography.getStyles({ size: 2, weight: '500', color: 'semiGrey' }) },
  regularAlt: { ...Typography.getStyles({ size: 2, weight: '700', color: 'secondary' }) },
  regularSmall: { ...Typography.getStyles({ size: 1, weight: '500', color: 'semiGrey' }) },
  regularSmallAlt: { ...Typography.getStyles({ size: 1, weight: '500', color: 'grey' }) },
  link: { ...Typography.getStyles({ color: 'primary', size: 2, weight: '700', decoration: 'underline' }) },
};

type TextProps = RNTextProps & {
  variant?: keyof typeof variants;
  spacing?: SpacingProp;
  typography?: TypographyProp;
  children: string;
};

const Text = ({ variant, spacing, typography, children, ...textProps }: TextProps) => {
  const styles = useMemo(() => StyleSheet.create({
    text: {
      ...variants[variant],
      ...Spacing.getStyles(spacing),
      ...Typography.getStyles(typography),
    },
  }), [variant, spacing, typography]);

  return (
    <RNText style={styles.text} {...textProps}>
      {children}
    </RNText>
  );
};

export default Text;
