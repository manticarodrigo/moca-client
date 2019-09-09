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

const primaryDisabled: ButtonVariant = {
  view: {
    ...Spacing.getStyles({ p: 3 }),
    ...Borders.primary,
    backgroundColor: Colors.buttonDisabled,
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

const tertiary: ButtonVariant = {
  view: {
    borderWidth: 1,
    borderColor: Colors.secondaryLighter,
    borderRadius: 6,
    height: 32,
    width: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { ...Typography.getStyles({ color: 'secondaryLight', size: 2 }) },
  underlayColor: Colors.secondaryLightest,
};

const buttonPressed: ButtonVariant = {
  view: {
    borderWidth: 1,
    borderColor: Colors.secondaryLighter,
    backgroundColor: Colors.secondary,
    borderRadius: 6,
    height: 32,
    width: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { ...Typography.getStyles({ color: 'secondaryLightest', size: 2 }) },
  underlayColor: Colors.secondaryLightest,
};

export {
  primary,
  tertiary,
  text,
  backdrop,
  secondary,
  buttonPressed,
  primaryDisabled,
};
