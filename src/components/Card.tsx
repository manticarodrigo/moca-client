import React, { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import {
  compose,
  space,
  border,
  layout,
  color,
  shadow,
  SpaceProps,
  BorderProps,
  LayoutProps,
  ColorProps,
  ShadowProps,
} from 'styled-system';

type ViewProps = SpaceProps & BorderProps & LayoutProps & ColorProps & ShadowProps;

type CardProps = ViewProps & {
  onPress: () => void;
  children?: ReactNode | ReactNode[];
};

const View = styled.View<ViewProps>(
  compose(
    space,
    border,
    layout,
    color,
    shadow,
  ),
);

View.defaultProps = {
  borderRadius: 2,
  padding: 3,
  width: '100%',
  backgroundColor: 'white',
  boxShadow: 0,
};

const Card = ({ onPress, children, ...props }: CardProps) => (
  <TouchableOpacity onPress={onPress}>
    <View {...props}>{children}</View>
  </TouchableOpacity>
);

export default Card;
