import React, { ReactNode } from 'react';
import { TouchableHighlightProps } from 'react-native';
import styled from 'styled-components/native';
import {
  compose,
  display,
  flexbox,
  space,
  layout,
  color,
  DisplayProps,
  FlexboxProps,
  SpaceProps,
  LayoutProps,
  ColorProps,
  TypographyProps,
} from 'styled-system';

import Text from '@src/components/Text';

type ButtonProps =
  & TouchableHighlightProps
  & DisplayProps
  & FlexboxProps
  & SpaceProps
  & LayoutProps
  & ColorProps
  & {
    textProps?: TypographyProps & ColorProps;
    onPress: () => void;
    children: ReactNode;
  };

const TouchableHighlight = styled.TouchableHighlight(
  compose(
    display,
    flexbox,
    space,
    layout,
    color,
  ),
);

const Button = ({ textProps = {}, children, ...props }: ButtonProps) => (
  <TouchableHighlight {...props}>
    <Text
      fontSize={textProps.fontSize || 3}
      fontWeight={textProps.fontWeight || 400}
      color={textProps.color || 'white'}
      {...textProps}
    >
      {children}
    </Text>
  </TouchableHighlight>
);

export default Button;
