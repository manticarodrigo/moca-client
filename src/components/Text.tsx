import React, { useMemo } from 'react';
import { StyleSheet, Text as RNText, TextProps as RNTextProps } from 'react-native';

import { Spacing, SpacingProp, Typography, TypographyProp } from '@src/styles';

const variants = {
  link: { ...Typography.getStyles({ size: 2, weight: '700', color: 'primary', decoration: 'underline' }) },
  title: { ...Typography.getStyles({ size: 4, weight: '700', color: 'primary' }) },
<<<<<<< HEAD
  regular: { ...Typography.getStyles({ color: 'semiGrey', size: 2, weight: '500' }) },
  link: { ...Typography.getStyles({ color: 'primary', size: 2, weight: '700', decoration: 'underline' }) },
  error: { ...Typography.getStyles({ color: 'error', size: 4, weight: '500' }) },
=======
  titleSmall: { ...Typography.getStyles({ size: 3, weight: '700', color: 'primary' }) },
  titleSmallWhite: { ...Typography.getStyles({ size: 3, weight: '700', color: 'white' }) },
  boldSecondary: { ...Typography.getStyles({ size: 2, weight: '700', color: 'secondary' }) },
  boldWhite: { ...Typography.getStyles({ size: 2, weight: '700', color: 'white' }) },
  boldGrey: { ...Typography.getStyles({ size: 2, weight: '700', color: 'grey' }) },
  boldSmallGrey: { ...Typography.getStyles({ size: 1, weight: '700', color: 'grey' }) },
  regular: { ...Typography.getStyles({ size: 2, weight: '500', color: 'semiGrey' }) },
  regularSmall: { ...Typography.getStyles({ size: 1, weight: '500', color: 'semiGrey' }) },
  regularSmallGrey: { ...Typography.getStyles({ size: 1, weight: '500', color: 'grey' }) },
  regularSmallDark: { ...Typography.getStyles({ size: 1, weight: '500', color: 'dark' }) },
  light: { ...Typography.getStyles({ size: 2, weight: '300', color: 'semiGrey' }) },
>>>>>>> 5a5a4aa8bda5f08a57c208e85cf7b206a32fce3a
};

type TextProps = RNTextProps & {
  variant?: keyof typeof variants;
  spacing?: SpacingProp;
  typography?: TypographyProp;
  children: string | JSX.Element[];
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
