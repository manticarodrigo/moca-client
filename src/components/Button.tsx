import React, { ReactChild } from 'react';
import styled from 'styled-components/native';
import { space, color, SpaceProps, ColorProps } from 'styled-system';

import Text from '@src/components/Text';

type ButtonProps = SpaceProps & ColorProps & {
  onPress: () => void;
  children?: ReactChild;
};

const TouchableHighlight = styled.TouchableHighlight(
  space,
  color,
);

const Button = ({ children, ...props }: ButtonProps) => (
  <TouchableHighlight {...props}>
    <Text fontSize={3} color="white">
      {children}
    </Text>
  </TouchableHighlight>
);

export default Button;
