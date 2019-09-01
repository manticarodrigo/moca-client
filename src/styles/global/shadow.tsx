import { ViewStyle } from 'react-native';

import * as Colors from './colors';

type ShadowColor = { color?: keyof typeof Colors };
type ShadowBlur = { blur?: 2 | 4 | 8 | 16 }; // according to Emre's guide.
type ShadowOpacity = { alpha?: 0.16 | 0.08 | 0.05 }; // according to Emre's guide.

export type ShadowProp = ShadowColor & ShadowBlur & ShadowOpacity;

export const getStyles = (prop: ShadowProp): ViewStyle => {
  if (!prop) { return null; }

  const { color, blur, alpha } = prop;

  return {
    ...(color && { shadowColor: Colors[color] }),
    ...(blur && { shadowOffset: { width: blur, height: blur === 16 ? 8 : blur } }),
    ...(alpha && { shadowOpacity: alpha }),
    ...(blur && { shadowRadius: blur }),
    ...(blur && { elevation: blur }),
  };
};
