import { ViewStyle } from 'react-native';

export const flex: ViewStyle = {
  flex: 1,
};

export const centerX: ViewStyle = {
  justifyContent: 'center',
};

export const centerY: ViewStyle = {
  alignItems: 'center',
};

export const centerXY = {
  ...centerX,
  ...centerY,
};

export const flexCenterY = {
  ...flex,
  ...centerY,
};

export const flexCenterXY = {
  ...flex,
  ...centerXY,
};
