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
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  radii: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  breakpoints: ['40em', '52em', '64em'],
  shadows: ['0 1px 2px rgba(0,0,0,0.25)'],
  colors: {
    white: '#fff',
    primary: '#223063',
    secondary: '#88d3e2',
    grey: '#f2f2f2',
    text: '#000',
  },
};
