import { ViewStyle } from 'react-native';

export const positions = ['0%', '10%', '20%', '30%', '40%'];

const aliases = {
  pr: 'right',
  pt: 'top',
  pb: 'bottom',
  pl: 'left',
};

type PositionKey = keyof typeof aliases;
type PositionTuple = [PositionKey, number];
export type PositionProp = PositionTuple | PositionTuple[];

const _position = (key: PositionKey, multiplier: number): ViewStyle => {
  const size = positions[multiplier];
  return { [aliases[key]]: size };
};

const _postions = (arr: PositionTuple[]): ViewStyle => arr
  .reduce((styles, [key, size]) => ({
    ...styles,
    ..._position(key, size),
  }), {});



export const get = (prop?: PositionProp) => {
  const isMultiDimArr = (arr: PositionProp): arr is PositionTuple[] => arr[0] instanceof Array;

  if (!prop) {
    return null;
  }

  if (isMultiDimArr(prop)) {
    return _postions(prop);
  }

  const [key, size] = prop;
  return _position(key, size);
};
