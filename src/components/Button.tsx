import React from 'react';
import { TouchableHighlightProps } from 'react-native';

import { TouchableHighlight, Text } from '@src/theme/components';


const variantProps = {
  primary: {
    backgroundColor: 'primary',
    padding: 3,
    textProps: {},
  },
  text: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '80px',
    bg: 'white',
    underlayColor: '#ddd',
    textProps: {
      color: 'text',
    },
  },
};

type ButtonProps = TouchableHighlightProps & {
  text: string;
  variant?: keyof typeof variantProps;
};

const Button = ({ text, variant = 'primary', onPress }: ButtonProps) => (
  <TouchableHighlight
    onPress={onPress}
    {...variantProps[variant]}
  >
    <Text
      fontSize={3}
      fontWeight={400}
      color="white"
      {...variantProps[variant].textProps}
    >
      {text}
    </Text>
  </TouchableHighlight>
);

export default Button;
