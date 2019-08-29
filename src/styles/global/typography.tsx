import { TextStyle } from 'react-native';

import * as Colors from './colors';

const fontSizes = [12, 14, 16, 18, 24, 32, 48, 64, 72];

type TypographySizeIndex = { size?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 };
type TypographyColor = { color?: keyof typeof Colors };
type TypographyWeight = { weight?: '300' | '500' | '700' | '900' };
type TypographyAlign = { align?: TextStyle['textAlign'] };
type TypographyTransform = { transform?: TextStyle['textTransform'] };
type TypographyDecoration = { decoration?: TextStyle['textDecorationLine'] };

export type TypographyProp =
  & TypographySizeIndex
  & TypographyWeight
  & TypographyAlign
  & TypographyTransform
  & TypographyDecoration
  & TypographyColor;

export const getStyles = (prop: TypographyProp): TextStyle => {
  if (!prop) { return null; }

  const {
    color,
    size,
    weight,
    align,
    transform,
    decoration,
  } = prop;

  return {
    color: Colors[color],
    fontSize: fontSizes[size],
    fontFamily: weight ? `family-${weight}` : null,
    textAlign: align,
    textTransform: transform,
    textDecorationLine: decoration,
  };
};
