import React, { useMemo } from 'react';
import { StyleSheet, TouchableHighlight, TouchableHighlightProps, Text } from 'react-native';

import { Spacing, SpacingProp, Colors, Buttons, Shadow } from '@src/styles';

type ButtonProps = TouchableHighlightProps & {
  variant?: keyof typeof Buttons;
  spacing?: SpacingProp;
  icon?: JSX.Element;
  width?: number | string;
  bgColor?: keyof typeof Colors;
  shadow?: boolean;
  children?: (string | JSX.Element) | (string | JSX.Element)[];
};

const Button = ({
  variant = 'primary',
  spacing,
  icon,
  width,
  bgColor,
  shadow,
  children,
  ...buttonProps
}: ButtonProps) => {
  const styles = useMemo(() => StyleSheet.create({
    view: {
      width,
      ...Buttons[variant].view,
      ...Spacing.getStyles(spacing),
      ...(icon && { flexDirection: 'row', alignItems: 'center' }),
      ...(bgColor && { backgroundColor: Colors[bgColor] }),
      ...(shadow && { ...Shadow.getStyles({ color: 'primary', blur: 2, alpha: 0.16 }) }),
    },
    text: {
      ...Buttons[variant].text,
      ...(icon && { ...Spacing.getStyles({ ml: 2 }) }),
    },
  }), [variant, spacing, icon, width, bgColor, shadow]);

  return (
    <TouchableHighlight
      style={styles.view}
      underlayColor={Buttons[variant].underlayColor}
      {...buttonProps}
    >
      <>
        {icon}
        <Text style={styles.text}>
          {children}
        </Text>
      </>
    </TouchableHighlight>
  );
};

export default Button;
