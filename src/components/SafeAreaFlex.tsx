
import styled, { css } from 'styled-components/native';
import { ThemeProps, ThemeColors } from '@src/types';

type SafeAreaFlexProps = {
  padding?: number;
  bgColor?: ThemeColors;
};

const SafeAreaFlex = styled.SafeAreaView<SafeAreaFlexProps & ThemeProps>(
  ({ padding = 0, bgColor = 'white', theme }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: ${theme.padding * padding}px;
    background-color: ${theme.colors[bgColor]};
  `);

export default SafeAreaFlex;
