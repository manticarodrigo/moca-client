import { StackNavigatorConfig } from 'react-navigation';

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

export const theme = {
  colors: {
    white: '#fff',
    primary: '#223063',
    secondary: '#88d3e2',
    grey: '#f2f2f2',
    text: '#000',
  },
  fonts: {
    sm: 14,
    md: 16,
    lg: 20,
  },
  sizes: [0, 10, 40, 70, 100, 130, 160, 190],
  margin: 10,
  borderRadius: 10,
  padding: 20,
  boxShadow: '0 1px 2px rgba(0,0,0,0.25)',
};
