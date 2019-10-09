import React, { useMemo } from 'react';
import { StyleSheet, Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';

import { Spacing, SpacingProp, Typography, TypographyProp, Texts } from '@src/styles';

type TextProps = RNTextProps & {
  variant?: keyof typeof Texts;
  style?: TextStyle;
  spacing?: SpacingProp;
  typography?: TypographyProp;
  children: (string | JSX.Element) | (string | JSX.Element)[];
};

const Text = ({ variant, style, spacing, typography, children, ...textProps }: TextProps) => {
  const styles = useMemo(() => StyleSheet.create({
    text: {
      ...Texts[variant],
      ...Spacing.getStyles(spacing),
      ...Typography.getStyles(typography),
    },
  }), [variant, spacing, typography]);

  return (
    <RNText style={[styles.text, style]} {...textProps}>
      {children}
    </RNText>
  );
};

export default Text;
