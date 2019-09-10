import { ViewStyle, TextStyle } from 'react-native';

import * as Spacing from '../global/spacing';
import * as Borders from '../global/borders';
import * as Typography from '../global/typography';
import * as Colors from '../global/colors';

type ButtonVariant = {
  view: ViewStyle;
  text: TextStyle;
  underlayColor: string;
}

const primary: ButtonVariant = {
  view: {
    ...Spacing.getStyles({ p: 3 }),
    ...Borders.primary,
    backgroundColor: Colors.primary,
  },
  text: { ...Typography.getStyles({ color: 'white', size: 3, weight: '700', align: 'center' }) },
  underlayColor: null,
};

const secondary: ButtonVariant = {
  view: {
    ...Spacing.getStyles({ p: 2 }),
    ...Borders.primary,
    borderWidth: 2,
    borderColor: Colors.secondaryLightest,
    backgroundColor: 'transparent',
    width: '100%',
  },
  text: { ...Typography.getStyles({ color: 'secondary', size: 3, weight: '700', align: 'center' }) },
  underlayColor: null,
};

const text: ButtonVariant = {
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    height: '100%',
    width: 80,
  },
  text: { ...Typography.getStyles({ color: 'semiGrey', size: 3 }) },
  underlayColor: Colors.grey,
};

const backdrop: ButtonVariant = {
  view: {
    backgroundColor: Colors.lightBlack,
    height: '100%',
    width: '100%',
  },
  text: undefined,
  underlayColor: undefined,
};

export {
  primary,
  secondary,
  text,
  backdrop,
};
