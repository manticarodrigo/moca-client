import React from 'react';
import styled, { css } from 'styled-components/native';

type ButtonWrapperProps = {
  readonly margin: number;
};

const ButtonWrapper = styled.TouchableHighlight<ButtonWrapperProps>(({ margin }) => css`
  margin: ${margin}px;
  padding: 10px 20px;
  background-color: #000;
`);

const ButtonText = styled.Text(props => css`
  font-size: 20px;
  color: #fff
`);

const Button = ({ margin, onPress, children }) => (
  <ButtonWrapper margin={margin} onPress={onPress}>
    <ButtonText>
      {children}
    </ButtonText>
  </ButtonWrapper>
);

export default Button;
