import { ViewStyle } from 'react-native';

export const space = [0, 4, 8, 16, 32, 64, 128, 256, 512];

const aliases = {
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
};

const compositions = {
  mx: [aliases.mr, aliases.ml],
  my: [aliases.mt, aliases.mb],
  px: [aliases.pr, aliases.pl],
  py: [aliases.pt, aliases.pb],
};

type SpacingKey = keyof typeof aliases | keyof typeof compositions;
type SpacingTuple = [SpacingKey, number];

const _space = (key: SpacingKey, multiplier: number): ViewStyle => {
  const size = space[multiplier];

  if (!aliases[key]) {
    return compositions[key].reduce((acc, style) => {
      acc[style] = size;

      return acc;
    }, {});
  }

  return { [aliases[key]]: size };
};

const _spaces = (arr: SpacingTuple[]): ViewStyle => arr
  .reduce((styles, [key, size]) => ({
    ...styles,
    ..._space(key, size),
  }), {});


export type SpacingProp = SpacingTuple | SpacingTuple[];

export const get = (prop?: SpacingProp) => {
  const isMultiDimArr = (arr: SpacingProp): arr is SpacingTuple[] => arr[0] instanceof Array;

  if (!prop) {
    return null;
  }

  if (isMultiDimArr(prop)) {
    return _spaces(prop);
  }

  const [key, size] = prop;
  return _space(key, size);
};
