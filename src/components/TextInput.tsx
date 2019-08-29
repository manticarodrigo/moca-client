import React, { useMemo } from 'react';
import { StyleSheet, TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native';

import { Spacing, SpacingProp, Typography, TypographyProp } from '@src/styles';

const variants = {
  primary: {},
};

type TextInputProps = RNTextInputProps & {
  variant?: keyof typeof variants;
  typography?: TypographyProp;
  spacing?: SpacingProp;
  expand?: boolean;
};

const TextInput = ({ variant, typography, spacing, expand, ...textProps }: TextInputProps) => {
  const styles = useMemo(() => StyleSheet.create({
    text: {
      ...Spacing.getStyles(spacing),
      ...Typography.getStyles(typography),
      ...variants[variant],
      flex: expand && 1,
    },
  }), [variant, typography, spacing, expand]);

  return <RNTextInput style={styles.text} {...textProps} />;
};

export default TextInput;
