import { ViewStyle, TextStyle } from 'react-native';

import * as Alignment from '../global/alignment';
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
    ...Spacing.get({ p: 3 }),
    ...Borders.primary,
    backgroundColor: Colors.primary,
  },
  text: { ...Typography.get({ color: 'white', size: 3 }) },
  underlayColor: undefined,
};

const text: ButtonVariant = {
  view: {
    ...Alignment.get('centerXY'),
    backgroundColor: Colors.white,
    height: '100%',
    width: 80,
  },
  text: { ...Typography.get({ color: 'text', size: 3 }) },
  underlayColor: Colors.grey,
};

export {
  primary,
  text,
};

export const backDrop: ButtonVariant = {
  style: {
    backgroundColor: Colors.lightBlack,
    height: '100%',
    width: '100%'
  },
  underlayColor: undefined,
};
