
import styled, { css } from 'styled-components/native';
import { ThemeProps, ThemeColors } from '@src/types';

type FlexProps = {
  padding?: number;
  bgColor?: ThemeColors;
};

const Flex = styled.View<FlexProps & ThemeProps>(
  ({ padding = 0, bgColor = 'white', theme }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: ${theme.padding * padding}px;
    background-color: ${theme.colors[bgColor]};
  `);

export default Flex;
