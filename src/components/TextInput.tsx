import React, { useMemo, forwardRef } from 'react';
import {
  StyleSheet,
  TextStyle,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';

import { Spacing, SpacingProp, Typography, TypographyProp, Colors, Texts } from '@src/styles';

const variants: { [key: string]: TextStyle } = {
  conversation: {
    ...Typography.getStyles({ ...Texts.regularSmall, color: 'grey' }),
    height: '100%',
    borderRadius: 24,
    backgroundColor: Colors.lightGrey,
  },
};

type TextInputProps = RNTextInputProps & SpacingProp & {
  variant?: keyof typeof variants;
  typography?: TypographyProp;
};

const TextInput = ({
  variant,
  typography,
  ...restProps
}: TextInputProps, ref: React.Ref<RNTextInput>) => {
  const { spacing, rest } = Spacing.parseProps(restProps);

  const styles = useMemo(() => StyleSheet.create({
    text: {
      ...Spacing.getStyles(spacing),
      ...Typography.getStyles(typography),
      ...variants[variant],
    },
  }), [variant, typography, spacing]);

  return <RNTextInput ref={ref} style={styles.text} {...rest} />;
};

export default forwardRef(TextInput);
