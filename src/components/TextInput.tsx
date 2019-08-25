import React, { useMemo } from 'react';
import { StyleSheet, TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native';

import { Alignment, Typography, Spacing } from '@src/styles';
import { SpacingProp } from '@src/styles/spacing';

const variants = {
  primary: {},
};

type TextInputProps = RNTextInputProps & {
  variant?: keyof typeof variants;
  text?: keyof typeof Typography.text;
  alignment?: keyof typeof Alignment;
  spacing?: SpacingProp;
};

const Text = ({ variant, text, spacing, alignment, ...textProps }: TextInputProps) => {
  const styles = useMemo(() => StyleSheet.create({
    text: {
      ...variants[variant],
      ...Typography.text[text],
      ...Alignment[alignment],
      ...Spacing.get(spacing),
    },
  }), [variant]);

  return <RNTextInput style={styles.text} {...textProps} />;
};

export default Text;
