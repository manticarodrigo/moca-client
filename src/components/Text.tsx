import React, { useMemo } from 'react';
import { StyleSheet, Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';

import { Spacing, SpacingProp, Typography, TypographyProp, Colors, Texts } from '@src/styles';

type TextProps = RNTextProps & {
  style?: TextStyle;
  spacing?: SpacingProp;
  variant?: keyof typeof Texts;
  color?: keyof typeof Colors;
  weight?: TypographyProp['weight'];
  size?: TypographyProp['size'];
  align?: TypographyProp['align'];
  decoration?: TypographyProp['decoration'];
  children: (string|number|JSX.Element) | (string|number|JSX.Element)[];
};

const Text = ({
  style,
  spacing,
  variant,
  weight,
  size,
  align,
  color,
  decoration,
  children,
  ...textProps
}: TextProps) => {
  const styles = useMemo(() => StyleSheet.create({
    text: {
      ...Spacing.getStyles(spacing),
      ...Typography.getStyles(Texts[variant]),
      ...Typography.getStyles({ weight, size, color, align, decoration }),
    },
  }), [spacing, variant, weight, size, align, color, decoration]);

  return (
    <RNText style={[styles.text, style]} {...textProps}>
      {children}
    </RNText>
  );
};

export default Text;
