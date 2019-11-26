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

export const spaceSize = [0, 4, 8, 16, 24, 32, 64, 128, 256, 512];


type SpacingKey = keyof typeof aliases | keyof typeof compositions;

const _getKeyStyles = (key: string, multiplier: number): ViewStyle => {
  const isNegative = Math.sign(multiplier) === -1;
  const absoluteSize = isNegative ? spaceSize[Math.abs(multiplier)] : spaceSize[multiplier];
  const size = isNegative ? -absoluteSize : absoluteSize;

  if (!aliases[key]) {
    const styles = {};

    compositions[key].forEach((style) => {
      styles[style] = size;
    });

    return styles;
  }

  return { [aliases[key]]: size };
};

export type SpacingProps = { [key in SpacingKey]?: number };

export const getStyles = (props?: SpacingProps): ViewStyle => {
  if (!props) { return null; }

  const propList = Object.entries(props);
  const viewStyle = propList.reduce((prev, [key, size]) => ({
    ...prev,
    ..._getKeyStyles(key, size),
  }), {});

  return viewStyle;
};

export const parseProps = (props: SpacingProps & object) => {
  const { m, mx, my, mt, mr, mb, ml, p, px, py, pt, pr, pb, pl, ...rest } = props;
  const spacing = { m, mx, my, mt, mr, mb, ml, p, px, py, pt, pr, pb, pl };

  Object.keys(spacing).forEach((key) => {
    if (!spacing[key]) delete spacing[key];
  });

  return [spacing, rest];
};
