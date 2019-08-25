import { ViewStyle } from 'react-native';

export const fill: ViewStyle = {
  flex: 1,
};

export const x: ViewStyle = {
  justifyContent: 'center',
};

export const y: ViewStyle = {
  alignItems: 'center',
};

export const xy = {
  ...x,
  ...y,
};

export const fillY = {
  ...fill,
  ...y,
};

export const fillXY = {
  ...fill,
  ...xy,
};
