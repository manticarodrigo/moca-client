import { StackNavigatorConfig } from 'react-navigation';

import * as Typography from '../global/typography';
import * as Colors from '../global/colors';

export const getBase = (title: string): StackNavigatorConfig => ({
  headerLayoutPreset: 'center',
  defaultNavigationOptions: {
    title,
    headerStyle: {
      borderBottomWidth: 0,
      height: 60,
      backgroundColor: Colors.primary,
    },
    headerTintColor: Colors.white,
    headerTitleStyle: {
      ...Typography.getStyles({ size: 5, weight: '700', color: 'white' }),
    },
  },
});
