import React, { useMemo } from 'react';
import { StyleSheet, Text as RNText, TextProps as RNTextProps } from 'react-native';

import { Spacing, SpacingProp, Typography, TypographyProp } from '@src/styles';

type TextProps = RNTextProps & {
  typography?: TypographyProp;
  spacing?: SpacingProp;
  children: string;
};

const Text = ({ typography, spacing, children, ...textProps }: TextProps) => {
  const styles = useMemo(() => StyleSheet.create({
    text: {
      ...Typography.getStyles(typography),
      ...Spacing.getStyles(spacing),
    },
  }), [typography, spacing]);

  return (
    <RNText style={styles.text} {...textProps}>
      {children}
    </RNText>
  );
};

export default Text;
