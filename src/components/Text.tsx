import React, { useMemo } from 'react';
import { StyleSheet, Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';

import { Spacing, SpacingProp, Typography, TypographyProp, Colors, Texts } from '@src/styles';

type TextProps = RNTextProps & SpacingProp & {
  style?: TextStyle;
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
  variant,
  weight,
  size,
  align,
  color,
  decoration,
  children,
  ...restProps
}: TextProps) => {
  const { spacing, rest } = Spacing.parseProps(restProps);

  const styles = useMemo(() => StyleSheet.create({
    text: {
      ...Spacing.getStyles(spacing),
      ...Typography.getStyles(Texts[variant]),
      ...Typography.getStyles({ weight, size, color, align, decoration }),
    },
  }), [spacing, variant, weight, size, align, color, decoration]);

  return (
    <RNText style={[styles.text, style]} {...rest}>
      {children}
    </RNText>
  );
};

export default Text;
