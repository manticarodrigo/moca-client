import { TextStyle } from 'react-native';

import * as Colors from './colors';

const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 72];

type TypographyColor = { color?: keyof typeof Colors };
type TypographySize = { size?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 };
type TypographyWeight = { weight?: TextStyle['fontWeight'] };
type TypographyTransform = { transform?: TextStyle['textTransform'] };
type TypographyObject = TypographySize & TypographyWeight & TypographyTransform & TypographyColor;

const _typography = ({ color, size, weight, transform }: TypographyObject): TextStyle => ({
  color: Colors[color],
  fontSize: fontSizes[size],
  fontWeight: weight,
  textTransform: transform,
});

export type TypographyProp = TypographyObject | TypographyObject[];

export const get = (prop: TypographyProp): TextStyle => {
  if (!prop) {
    return null;
  }

  if (prop instanceof Array) {
    return prop.reduce((acc, object) => ({ ...acc, ..._typography(object) }), {});
  }

  return _typography(prop);
};
