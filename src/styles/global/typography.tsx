import { TextStyle } from 'react-native';
import * as Font from 'expo-font';

import MuseoSansRounded300 from '@src/assets/fonts/MuseoSansRounded-300.otf';
import MuseoSansRounded500 from '@src/assets/fonts/MuseoSansRounded-500.otf';
import MuseoSansRounded700 from '@src/assets/fonts/MuseoSansRounded-700.otf';
import MuseoSansRounded900 from '@src/assets/fonts/MuseoSansRounded-900.otf';

import * as Colors from './colors';

export const loadFonts = async () => {
  await Font.loadAsync({
    'family-300': MuseoSansRounded300,
    'family-500': MuseoSansRounded500,
    'family-700': MuseoSansRounded700,
    'family-900': MuseoSansRounded900,
  });
};

const fontSizes = [12, 14, 16, 18, 24, 32, 48, 64, 72, 80];

type TypographySizeIndex = { size?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 };
type TypographyColor = { color?: keyof typeof Colors };
type TypographyWeight = { weight?: '300' | '500' | '700' | '900' };
type TypographyAlign = { align?: TextStyle['textAlign'] };
type TypographyTransform = { transform?: TextStyle['textTransform'] };
type TypographyDecoration = { decoration?: TextStyle['textDecorationLine'] };
type TypographyHeight = { height?: 0 | 22 };

export type TypographyProp =
  & TypographySizeIndex
  & TypographyWeight
  & TypographyAlign
  & TypographyTransform
  & TypographyDecoration
  & TypographyColor
  & TypographyHeight;

export const getStyles = (prop: TypographyProp): TextStyle => {
  if (!prop) { return null; }

  const {
    color,
    size,
    weight,
    align,
    transform,
    decoration,
    height,
  } = prop;

  return {
    ...(color && { color: Colors[color] }),
    ...(size && { fontSize: fontSizes[size] }),
    ...(weight && { fontFamily: `family-${weight}` }),
    ...(align && { textAlign: align }),
    ...(transform && { textTransform: transform }),
    ...(decoration && { textDecorationLine: decoration }),
    ...(height && { lineHeight: height }),
  };
};
