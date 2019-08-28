import { ViewStyle } from 'react-native';

const aliases = {
  fill: { flex: 1 },
  centerX: { justifyContent: 'center' },
  centerY: { alignItems: 'center' },
  row: { flexDirection: 'row' },
  column: { flexDirection: 'column' },
  alignEnd: { alignSelf: 'flex-end' },
  alignStart: { alignSelf: 'flex-start' },
};

const compositions = {
  centerXY: [aliases.centerX, aliases.centerY],
};

type AlignmentKey = keyof typeof aliases | keyof typeof compositions;

const _alignment = (key: AlignmentKey): ViewStyle => {
  if (!aliases[key]) {
    const styles = {};

    compositions[key].forEach((style) => Object.assign(styles, style));

    return styles;
  }

  return aliases[key];
};

export type AlignmentProp = AlignmentKey | AlignmentKey[];

export const get = (prop: AlignmentProp): ViewStyle => {
  if (!prop) {
    return null;
  }

  if (prop instanceof Array) {
    const styles = {};

    prop.forEach((key) => Object.assign(styles, _alignment(key)));

    return styles;
  }

  return _alignment(prop);
};
