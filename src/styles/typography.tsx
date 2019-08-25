import { TextStyle } from 'react-native';

import { theme } from '@src/theme';


const colorText: TextStyle = {
  color: theme.colors.text,
};

const colorWhite: TextStyle = {
  color: theme.colors.white,
};

const sizeSmall: TextStyle = {
  fontSize: theme.fontSizes[2],
};

const sizeMedium: TextStyle = {
  fontSize: theme.fontSizes[3],
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
