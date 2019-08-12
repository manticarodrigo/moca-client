import { StackNavigatorConfig } from 'react-navigation';
import { Theme } from 'styled-system';

export const getHeaderTheme = (title: string): StackNavigatorConfig => ({
  headerLayoutPreset: 'left',
  defaultNavigationOptions: {
    title,
    headerStyle: {
      backgroundColor: '#f2f2f2',
      height: 60,
      borderBottomWidth: 0,
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontSize: 33,
      fontWeight: 'bold',
    },
  },
});

export const theme: Theme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: [0, 10, 40, 70, 100, 130, 160, 190],
  radii: [0, 10, 40, 70, 100, 130, 160, 190],
  fontSizes: [0, 12, 14, 16, 18, 20, 22, 24, 28],
  colors: {
    white: '#fff',
    primary: '#223063',
    secondary: '#88d3e2',
    grey: '#f2f2f2',
    text: '#000',
  },
  shadows: ['0 1px 2px rgba(0,0,0,0.25)'],
};
