import React, { useMemo } from 'react';
import { StyleSheet, Text as RNText, TextProps as RNTextProps } from 'react-native';

import { Spacing, SpacingProp, Typography, TypographyProp } from '@src/styles';

const variants = {
  title: { ...Typography.getStyles({ size: 4, weight: '700', color: 'primary' }) },
  regular: { ...Typography.getStyles({ color: 'semiGrey', size: 2, weight: '500' }) },
  link: { ...Typography.getStyles({ color: 'primary', size: 2, weight: '700', decoration: 'underline' }) },
};

type TextProps = RNTextProps & {
  variant?: keyof typeof variants;
  typography?: TypographyProp;
  spacing?: SpacingProp;
  children: string;
};

const Text = ({ variant, typography, spacing, children, ...textProps }: TextProps) => {
  const styles = useMemo(() => StyleSheet.create({
    text: {
      ...variants[variant],
      ...Spacing.getStyles(spacing),
      ...Typography.getStyles(typography),
    },
  }), [variant, typography, spacing]);

  return (
    <RNText style={styles.text} {...textProps}>
      {children}
    </RNText>
  );
};

export default Text;
