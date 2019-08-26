import { ViewStyle } from 'react-native';

import * as Colors from '../global/colors';
import * as Spacing from '../global/spacing';

type ButtonVariant = {
  style: ViewStyle;
  underlayColor: string;
}
export const primary: ButtonVariant = {
  style: {
    borderRadius: Spacing.space[2],
    padding: Spacing.space[3],
    backgroundColor: Colors.primary,
  },
  underlayColor: undefined,
};

export const text: ButtonVariant = {
  style: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: 80,
    backgroundColor: Colors.white,
  },
  underlayColor: '#ddd',
};
