import React, { ReactChild } from 'react';
import styled, { css } from 'styled-components/native';

import { ThemeProps } from '@src/types';
import Text from '@src/components/Text';

type ButtonTouchableProps = {
  margin?: number;
  padding?: number;
  secondary?: boolean;
};

type ButtonTextProps = {
  fontSize?: number;
};

type ButtonProps = ButtonTouchableProps & ButtonTextProps & {
  onPress: () => void;
  children?: ReactChild;
};

const ButtonTouchable = styled.TouchableHighlight<ButtonTouchableProps & ThemeProps>(
  ({ margin = 1, padding = 1, secondary, theme }) => css`
    margin: ${theme.margin * margin}px;
    padding: ${(theme.padding / 2) * padding}px ${theme.padding * padding}px;
    backgroundColor: ${secondary ? theme.colors.secondary : theme.colors.primary};
  `);

const ButtonText = styled.Text<ButtonTextProps & ThemeProps>(
  ({ fontSize = 1, theme }) => css`
    color: #fff
    fontSize: ${theme.fonts.md * fontSize};
  `);

const Button = ({ onPress, children, ...props }: ButtonProps) => (
  <ButtonTouchable {...props}>
    <ButtonText {...props}>
      {children}
    </ButtonText>
  </ButtonTouchable>
);

export default Button;
