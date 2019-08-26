import { ViewStyle } from 'react-native';

const aliases = {
  flex: {
    flex: 1,
  },
  centerX: {
    justifyContent: 'center',
  },
  centerY: {
    alignItems: 'center',
  },
};

const compositions = {
  centerXY: [aliases.centerX, aliases.centerY],
};

type AlignmentKey = keyof typeof aliases | keyof typeof compositions;
export type AlignmentProp = AlignmentKey | AlignmentKey[];

const _alignment = (key: AlignmentKey): ViewStyle => {
  if (!aliases[key]) {
    return compositions[key].reduce((acc, style) => ({ ...acc, ...style }), {});
  }

  return { ...aliases[key] };
};

export const get = (prop: AlignmentProp): ViewStyle => {
  const isArr = (arr: AlignmentProp): arr is AlignmentKey[] => arr instanceof Array;

  if (!prop) {
    return null;
  }

  if (isArr(prop)) {
    return prop.reduce((styles, key) => ({ ...styles, ..._alignment(key) }), {});
  }

  return _alignment(prop);
};
