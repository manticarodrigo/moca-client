import { TextStyle } from 'react-native';

import * as Colors from './colors';

const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 72];

type TypographySizeIndex = { size?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 };
type TypographyColor = { color?: keyof typeof Colors };
type TypographyWeight = { weight?: TextStyle['fontWeight'] };
type TypographyAlign = { align?: TextStyle['textAlign'] };
type TypographyTransform = { transform?: TextStyle['textTransform'] };

export type TypographyProp =
  & TypographySizeIndex
  & TypographyWeight
  & TypographyAlign
  & TypographyTransform
  & TypographyColor;

export const get = ({
  color,
  size,
  weight,
  align,
  transform,
}: TypographyProp): TextStyle => ({
  color: Colors[color],
  fontSize: fontSizes[size],
  fontFamily: weight ? `family-${weight}` : undefined,
  textAlign: align,
  textTransform: transform,
});
