import React, { useMemo, forwardRef } from 'react';
import {
  StyleSheet,
  TextStyle,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';

import { Spacing, SpacingProps, Typography, TypographyProps, Colors, Texts } from '@src/styles';

const variants: { [key: string]: TextStyle } = {
  conversation: {
    ...Typography.getStyles({ ...Texts.regularSmall, color: 'grey' }),
    height: '100%',
    borderRadius: 24,
    backgroundColor: Colors.lightGrey,
  },
};

type TextInputProps = RNTextInputProps & TypographyProps & SpacingProps & {
  variant?: keyof typeof variants;
  width?: number | string;
};

const TextInput = ({
  variant,
  width,
  ...restProps
}: TextInputProps, ref: React.Ref<RNTextInput>) => {
  const [typography, typographyRest] = Typography.parseProps(restProps);
  const [spacing, spacingRest] = Spacing.parseProps(typographyRest);

  const styles = useMemo(() => StyleSheet.create({
    text: {
      width,
      ...Spacing.getStyles(spacing),
      ...Typography.getStyles(typography),
      ...variants[variant],
    },
  }), [variant, typography, spacing, width]);

  return <RNTextInput ref={ref} style={styles.text} {...spacingRest} />;
};

export default forwardRef(TextInput);
