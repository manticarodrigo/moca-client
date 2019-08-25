import React, { useMemo } from 'react';
import { StyleSheet, TouchableHighlight, TouchableHighlightProps, Text } from 'react-native';
import { Buttons, Typography } from '@src/styles';

type ButtonProps = TouchableHighlightProps & {
  variant?: keyof typeof Buttons;
  children: string;
};

const Button = ({ variant = 'primary', onPress, children }: ButtonProps) => {
  const styles = useMemo(() => StyleSheet.create({
    button: {
      ...Buttons[variant],
    },
    text: {
      ...Typography.button[variant],
    },
  }), [variant]);

  const underlay = {
    primary: undefined,
    text: '#ddd',
  };

  return (
    <TouchableHighlight
      style={styles.button}
      underlayColor={underlay[variant]}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {children}
      </Text>
    </TouchableHighlight>
  );
};

export default Button;
