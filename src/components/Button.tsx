import React, { useMemo } from 'react';
import { StyleSheet, TouchableHighlight, TouchableHighlightProps, Text } from 'react-native';
import { Buttons, Typography } from '@src/styles';

type ButtonProps = TouchableHighlightProps & {
  variant?: keyof typeof Buttons;
  children?: string;
};

const Button = ({ variant = 'primary', onPress, children }: ButtonProps) => {
  const styles = useMemo(() => StyleSheet.create({
    button: {
      ...Buttons[variant].style,
    },
    text: {
      ...Typography.button[variant],
    },
  }), [variant]);

  return (
    <TouchableHighlight
      style={styles.button}
      underlayColor={Buttons[variant].underlayColor}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {children}
      </Text>
    </TouchableHighlight>
  );
};

export default Button;
