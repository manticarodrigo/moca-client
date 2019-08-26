import { ViewStyle, TextStyle } from 'react-native';
import { StackNavigatorConfig } from 'react-navigation';

import * as Typography from '../global/typography';
import * as Colors from '../global/colors';

const headerStyles: ViewStyle = {
  backgroundColor: Colors.grey,
  height: 60,
  borderBottomWidth: 0,
};

const titleStyles: TextStyle = {
  fontSize: Typography.fontSizes[5],
  fontWeight: 'bold',
};

export const getBase = (title: string): StackNavigatorConfig => ({
  headerLayoutPreset: 'left',
  defaultNavigationOptions: {
    title,
    headerStyle: {
      ...headerStyles,
    },
    headerTintColor: Colors.text,
    headerTitleStyle: {
      ...titleStyles,
    },
  },
});
