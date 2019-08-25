import { ViewStyle, TextStyle } from 'react-native';
import { StackNavigatorConfig } from 'react-navigation';

import { theme } from '@src/theme';

const headerStyles: ViewStyle = {
  backgroundColor: theme.colors.grey,
  height: 60,
  borderBottomWidth: 0,
};

const titleStyles: TextStyle = {
  fontSize: theme.fontSizes[5],
  fontWeight: 'bold',
};

export const getBase = (title: string): StackNavigatorConfig => ({
  headerLayoutPreset: 'left',
  defaultNavigationOptions: {
    title,
    headerStyle: {
      ...headerStyles,
    },
    headerTintColor: theme.colors.text,
    headerTitleStyle: {
      ...titleStyles,
    },
  },
});
