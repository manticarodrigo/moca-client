import React, { useMemo } from 'react';
import { StyleSheet, Text as RNText, TextProps as RNTextProps } from 'react-native';

import { Typography, Spacing } from '@src/styles';
import { SpacingProp } from '@src/styles/spacing';

type TextProps = RNTextProps & {
  variant?: keyof typeof Typography.text;
  spacing?: SpacingProp;
  children: string;
};

const Text = ({ variant, spacing, children, ...textProps }: TextProps) => {
  const styles = useMemo(() => StyleSheet.create({
    text: {
      ...Typography.text[variant],
      ...Spacing.get(spacing),
    },
  }), [variant]);

  return (
    <RNText style={styles.text} {...textProps}>
      {children}
    </RNText>
  );
};

export default Text;
