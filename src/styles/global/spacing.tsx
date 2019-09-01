import { ViewStyle } from 'react-native';

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

const spaceSize = [0, 4, 8, 16, 32, 64, 128, 256, 512];

type SpacingSizeIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type SpacingKey = keyof typeof aliases | keyof typeof compositions;

const _getKeyStyles = (key: string, multiplier: SpacingSizeIndex): ViewStyle => {
  const size = spaceSize[multiplier];

  if (!aliases[key]) {
    const styles = {};

    compositions[key].forEach((style) => {
      styles[style] = size;
    });

    return styles;
  }

  return { [aliases[key]]: size };
};

export type SpacingProp = { [key in SpacingKey]?: SpacingSizeIndex };

export const getStyles = (prop?: SpacingProp): ViewStyle => {
  if (!prop) { return null; }

  const propList = Object.entries(prop);
  const viewStyle = propList.reduce((prev, [key, size]) => ({
    ...prev,
    ..._getKeyStyles(key, size),
  }), {});

  return viewStyle;
};
