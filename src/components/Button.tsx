import React, { useMemo } from 'react';
import { StyleSheet, TouchableHighlight, TouchableHighlightProps, Text } from 'react-native';

import { Buttons } from '@src/styles';

type ButtonProps = TouchableHighlightProps & {
  variant?: keyof typeof Buttons;
  children: string;
};

const Button = ({ variant = 'primary', onPress, children }: ButtonProps) => {
  const styles = useMemo(() => StyleSheet.create({
    view: { ...Buttons[variant].view },
    text: { ...Buttons[variant].text },
  }), [variant]);

  return (
    <TouchableHighlight
      style={styles.view}
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
