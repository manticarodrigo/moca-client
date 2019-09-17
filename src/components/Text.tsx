import React, { useMemo } from 'react';
import { StyleSheet, Text as RNText, TextProps as RNTextProps } from 'react-native';

import { Spacing, SpacingProp, Typography, TypographyProp } from '@src/styles';

const variants = {
  link: { ...Typography.getStyles({ size: 2, weight: '700', color: 'primary', decoration: 'underline' }) },
  title: { ...Typography.getStyles({ size: 4, weight: '700', color: 'primary' }) },
  titleSecondary: { ...Typography.getStyles({ size: 4, weight: '700', color: 'secondary' }) },
  titleSecondaryLight: { ...Typography.getStyles({ size: 4, weight: '700', color: 'secondaryLight' }) },
  titlePrimaryLarge: { ...Typography.getStyles({ size: 5, weight: '700', color: 'primary' }) },
  titleSecondaryLarge: { ...Typography.getStyles({ size: 5, weight: '700', color: 'secondary' }) },
  titleSmall: { ...Typography.getStyles({ size: 3, weight: '700', color: 'primary' }) },
  titleSmallWhite: { ...Typography.getStyles({ size: 3, weight: '700', color: 'white' }) },
  boldSecondary: { ...Typography.getStyles({ size: 2, weight: '700', color: 'secondary' }) },
  boldWhite: { ...Typography.getStyles({ size: 2, weight: '700', color: 'white' }) },
  boldGrey: { ...Typography.getStyles({ size: 2, weight: '700', color: 'grey' }) },
  boldSmallGrey: { ...Typography.getStyles({ size: 1, weight: '700', color: 'grey' }) },
  regular: { ...Typography.getStyles({ size: 2, weight: '500', color: 'semiGrey' }) },
  regularPrimary: { ...Typography.getStyles({ size: 2, weight: '500', color: 'primary' }) },
  regularSecondary: { ...Typography.getStyles({ size: 2, weight: '500', color: 'secondary' }) },
  regularSmall: { ...Typography.getStyles({ size: 1, weight: '500', color: 'semiGrey' }) },
  regularSmallGrey: { ...Typography.getStyles({ size: 1, weight: '500', color: 'grey' }) },
  regularSmallSuccess: { ...Typography.getStyles({ size: 1, weight: '500', color: 'success' }) },
  regularSmallDark: { ...Typography.getStyles({ size: 1, weight: '500', color: 'dark' }) },
  light: { ...Typography.getStyles({ size: 2, weight: '300', color: 'semiGrey' }) },
  lightPrimarySmallest: { ...Typography.getStyles({ size: 0, weight: '300', color: 'primary' }) },
  lightSecondarySmallest: { ...Typography.getStyles({ size: 0, weight: '300', color: 'secondary' }) },
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
