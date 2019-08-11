import React, { ReactNode } from 'react';
import { View, TouchableOpacityProps } from 'react-native';
import styled, { css } from 'styled-components/native';

import { ThemeProps } from '@src/types';

type CardTouchableProps = {
  borderRadius?: string;
  padding?: string;
  width?: string;
  backgroundColor?: string;
};

type CardProps = TouchableOpacityProps & CardTouchableProps & {
  children?: ReactNode;
};

const CardTouchable = styled.TouchableOpacity<CardTouchableProps & ThemeProps>(
  ({ borderRadius, padding, width, backgroundColor, theme }) => css`
    borderRadius: ${borderRadius || theme.borderRadius}px;
    padding: ${padding || theme.padding}px;
    width: ${width || '100%'};
    backgroundColor: ${backgroundColor || theme.colors.white};
  `);

const Card = ({ children, ...props }: CardProps) => (
  <CardTouchable {...props}>
    <View>{children}</View>
  </CardTouchable>
);

export default Card;
