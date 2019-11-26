import React, { useMemo } from 'react';
import { StyleSheet, TouchableHighlight, TouchableHighlightProps, Text } from 'react-native';

import { Spacing, SpacingProps, Colors, Buttons, Shadow } from '@src/styles';

type ButtonProps = TouchableHighlightProps & SpacingProps & {
  variant?: keyof typeof Buttons;
  icon?: JSX.Element;
  width?: number | string;
  bgColor?: keyof typeof Colors;
  shadow?: boolean;
  subtitle?: JSX.Element;
  children?: (string | JSX.Element) | (string | JSX.Element)[];
};

const Button = ({
  variant = 'primary',
  icon,
  width,
  bgColor,
  shadow,
  subtitle,
  children,
  ...restProps
}: ButtonProps) => {
  const [spacing, rest] = Spacing.parseProps(restProps);

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
      {...rest}
    >
      <>
        {icon}
        <Text style={styles.text}>
          {children}
        </Text>
        {subtitle}
      </>
    </TouchableHighlight>
  );
};

export default Button;
