import { TextStyle } from 'react-native';

import * as Colors from '@src/styles/global/colors';

export const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 72];

const colorText: TextStyle = {
  color: Colors.text,
};

const colorWhite: TextStyle = {
  color: Colors.white,
};

const sizeSmall: TextStyle = {
  fontSize: fontSizes[2],
};

const sizeMedium: TextStyle = {
  fontSize: fontSizes[3],
};

const weightLight: TextStyle = {
  fontWeight: '100',
};

const weightBold: TextStyle = {
  fontWeight: '700',
};

const transformUppercase: TextStyle = {
  textTransform: 'uppercase',
};

const base = {
  ...colorText,
  ...sizeMedium,
};

export const text = {
  base: {
    ...base,
  },
  smallLight: {
    ...base,
    ...sizeSmall,
    ...weightLight,
  },
  bold: {
    ...base,
    ...weightBold,
  },
  uppercase: {
    ...transformUppercase,
  },
};

export const button = {
  primary: {
    ...base,
    ...colorWhite,
  },
  text: {
    ...base,
  },
};
