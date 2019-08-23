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

const marginProps = {
  mt: {
    marginTop: 3,
  },
  mb: {
    marginBottom: 3,
  },
};

type CardProps = TouchableOpacityProps & {
  variant?: keyof typeof variantProps;
  margin?: keyof typeof marginProps;
  children?: ReactNode | ReactNode[];
};

const Card = ({ variant = 'primary', margin, onPress, children }: CardProps) => (
  <TouchableOpacity
    onPress={onPress}
    {...variantProps[variant]}
    {...marginProps[margin]}
  >
    {children}
  </TouchableOpacity>
);

export default Card;
