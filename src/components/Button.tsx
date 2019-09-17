import React, { useMemo } from 'react';
import { StyleSheet, TouchableHighlight, TouchableHighlightProps } from 'react-native';

import { Spacing, SpacingProp, Buttons } from '@src/styles';

import Text from './Text';

type ButtonProps = TouchableHighlightProps & {
  variant?: keyof typeof Buttons;
  spacing?: SpacingProp;
  icon?: JSX.Element;
  children?: (string | JSX.Element) | (string | JSX.Element)[];
};

const Button = ({ variant = 'primary', spacing, icon, children, ...buttonProps }: ButtonProps) => {
  const styles = useMemo(() => StyleSheet.create({
    view: {
      ...Buttons[variant].view,
      ...Spacing.getStyles(spacing),
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      ...Buttons[variant].text,
      ...(icon && { ...Spacing.getStyles({ ml: 2 }) }),
    },
  }), [variant, spacing, icon]);

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
