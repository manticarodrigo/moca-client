import { ViewStyle, TextStyle } from 'react-native';
import { StackNavigatorConfig } from 'react-navigation';

import * as Typography from '../global/typography';
import * as Colors from '../global/colors';

const headerStyles: ViewStyle = {
  borderBottomWidth: 0,
  height: 60,
  backgroundColor: Colors.grey,
};

const titleStyles: TextStyle = {
  ...Typography.get({ size: 5, weight: '700' }),
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
