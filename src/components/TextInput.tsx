import React, { useMemo } from 'react';
import { StyleSheet, TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native';

import { Alignment, AlignmentProp, Spacing, SpacingProp, Typography, TypographyProp } from '@src/styles';

const variants = {
  primary: {},
};

type TextInputProps = RNTextInputProps & {
  variant?: keyof typeof variants;
  typography?: TypographyProp;
  alignment?: AlignmentProp;
  spacing?: SpacingProp;
};

const Text = ({ variant, typography, spacing, alignment, ...textProps }: TextInputProps) => {
  const styles = useMemo(() => StyleSheet.create({
    text: {
      ...variants[variant],
      ...Typography.get(typography),
      ...Alignment.get(alignment),
      ...Spacing.get(spacing),
    },
  }), [variant, typography, alignment, spacing]);

  return <RNTextInput style={styles.text} {...textProps} />;
};

export default Text;
