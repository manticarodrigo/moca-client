import React, { useMemo } from 'react';
import { StyleSheet, TouchableHighlight, TouchableHighlightProps, Text } from 'react-native';

import { Spacing, SpacingProp, Colors, Buttons } from '@src/styles';

type ButtonProps = TouchableHighlightProps & {
  variant?: keyof typeof Buttons;
  spacing?: SpacingProp;
  icon?: JSX.Element;
  bgColor?: keyof typeof Colors;
  children?: (string | JSX.Element) | (string | JSX.Element)[];
};

const Button = ({
  variant = 'primary',
  spacing,
  icon,
  bgColor,
  children,
  ...buttonProps
}: ButtonProps) => {
  const styles = useMemo(() => StyleSheet.create({
    view: {
      ...Buttons[variant].view,
      ...Spacing.getStyles(spacing),
      ...(icon && { flexDirection: 'row', alignItems: 'center' }),
      ...(bgColor && { backgroundColor: Colors[bgColor] }),
    },
    text: {
      ...Buttons[variant].text,
      ...(icon && { ...Spacing.getStyles({ ml: 2 }) }),
    },
  }), [variant, spacing, icon, bgColor]);

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
