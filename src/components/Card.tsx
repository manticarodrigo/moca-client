import React, { ReactNode } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { TouchableOpacity } from '@src/theme/components';

const variantProps = {
  primary: {
    borderRadius: 2,
    padding: 3,
    width: '100%',
    backgroundColor: 'white',
    boxShadow: 0,
  },
};

type CardProps = TouchableOpacityProps & {
  variant?: keyof typeof variantProps;
  children?: ReactNode | ReactNode[];
};

const Card = ({ variant = 'primary', onPress, children }: CardProps) => (
  <TouchableOpacity {...variantProps[variant]} onPress={onPress}>
    {children}
  </TouchableOpacity>
);

export default Card;
