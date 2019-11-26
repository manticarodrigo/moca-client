import React, { useMemo } from 'react';
import { StyleSheet, Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';

import { Spacing, SpacingProps, Typography, TypographyProps, Texts } from '@src/styles';

type TextProps = RNTextProps & TypographyProps & SpacingProps & {
  style?: TextStyle;
  variant?: keyof typeof Texts;
  children: (string|number|JSX.Element) | (string|number|JSX.Element)[];
};

const Text = ({
  style,
  variant,
  children,
  ...restProps
}: TextProps) => {
  const [typography, typographyRest] = Typography.parseProps(restProps);
  const [spacing, spacingRest] = Spacing.parseProps(typographyRest);

  const styles = useMemo(() => StyleSheet.create({
    text: {
      ...Typography.getStyles(Texts[variant]),
      ...Typography.getStyles(typography),
      ...Spacing.getStyles(spacing),
    },
  }), [typography, variant, spacing]);

  return (
    <RNText style={[styles.text, style]} {...spacingRest}>
      {children}
    </RNText>
  );
};

export default Text;
