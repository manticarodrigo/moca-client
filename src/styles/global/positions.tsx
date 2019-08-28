import { ViewStyle } from 'react-native';

export const positions = ['0%', '10%', '20%', '30%', '40%'];

const aliases = {
  pr: 'right',
  pt: 'top',
  pb: 'bottom',
  pl: 'left',
};


export type PositionsIndex = 0 | 1 | 2 | 3 | 4;

type PositionKey = keyof typeof aliases;

export type PositionProp = { [key in PositionKey]?: PositionsIndex };

const _position = (key: string, multiplier: PositionsIndex): ViewStyle => {
  const size = positions[multiplier];
  return { [aliases[key]]: size };
};


export const get = (prop?: PositionProp): ViewStyle => {
  if (!prop) {
    return null;
  }

  const styles = {};

  Object.entries(prop).forEach(([key, size]) =>
    Object.assign(styles, _position(key, size)));

  return styles;
};
